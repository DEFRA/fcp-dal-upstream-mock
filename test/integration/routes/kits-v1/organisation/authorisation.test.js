import { describe, it, beforeAll, afterAll, expect } from 'vitest'

describe('Authorisation create & update (Ticket #29)', () => {
  let mockServer
  const PROCESS_ENV = process.env

  beforeAll(async () => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '0' // any free port, so it can't clash with other test files
    const { startServer } = await import('../../../../../src/server.js')
    mockServer = await startServer()
  })

  afterAll(async () => {
    process.env = PROCESS_ENV
    await mockServer?.stop({ timeout: 0 })
  })

  const createPayload = {
    personRoles: [
      {
        role: 'Agent',
        personId: 22222220
      }
    ],
    personPrivileges: [
      {
        personId: 22222220,
        privilegeNames: ['Amend - business', 'Submit - bps']
      }
    ]
  }

  it('POST should create an authorisation when the person is not already linked', async () => {
    // 22222220 exists but is only a customer of org 222222222
    const { statusCode, payload } = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { authorization: 'Bearer token' },
      payload: createPayload
    })
    expect(statusCode).toBe(200)
    const body = JSON.parse(payload)
    expect(body).toEqual({ data: null, success: true, errorString: null })
  })

  it('POST should return 409 when the person is already authorised on the organisation', async () => {
    const { statusCode, payload } = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { authorization: 'Bearer token' },
      payload: {
        personRoles: [
          {
            role: 'Agent',
            personId: 11111111
          }
        ],
        personPrivileges: [
          {
            personId: 11111111,
            privilegeNames: ['Amend - business', 'Submit - bps']
          }
        ]
      }
    })
    expect(statusCode).toBe(409)
    const body = JSON.parse(payload)
    expect(body).toEqual({ data: null, success: false, errorString: 'Relation already exists' })
  })

  const updatePayload = {
    personRoles: [
      {
        role: 'Agent',
        personId: 11111111
      }
    ],
    personPrivileges: [
      {
        personId: 11111111,
        privilegeNames: ['Amend - land', 'Submit - cs app']
      }
    ]
  }

  it('PUT should update an existing authorisation when called without email header', async () => {
    const { statusCode, payload } = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/11111111',
      headers: { authorization: 'Bearer token' },
      payload: updatePayload
    })
    expect(statusCode).toBe(200)
    const body = JSON.parse(payload)
    expect(body).toEqual({ data: null, success: true, errorString: null })
  })

  it('PUT should succeed and be idempotent when the same payload is submitted again', async () => {
    // 22222222 is NOT initially linked to org 111111111 — guaranteed clean start
    const payload = {
      personRoles: [{ role: 'Agent', personId: 22222222 }],
      personPrivileges: [
        { personId: 22222222, privilegeNames: ['Amend - land', 'Submit - cs app'] }
      ]
    }

    // Create the initial link via POST
    const create = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { authorization: 'Bearer token' },
      payload
    })
    expect(create.statusCode).toBe(200)

    // PUT with the same payload succeeds (idempotent)
    const first = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/22222222',
      headers: { authorization: 'Bearer token' },
      payload
    })
    expect(first.statusCode).toBe(200)
    expect(JSON.parse(first.payload)).toEqual({ data: null, success: true, errorString: null })

    // Second identical PUT also succeeds
    const second = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/22222222',
      headers: { authorization: 'Bearer token' },
      payload
    })
    expect(second.statusCode).toBe(200)
    expect(JSON.parse(second.payload)).toEqual({ data: null, success: true, errorString: null })
  })

  describe('path parameter validation', () => {
    const postTo = (orgId) =>
      mockServer.inject({
        method: 'POST',
        url: `/extapi/SitiAgriApi/authorisation/organisation/${orgId}/authorisation`,
        headers: { authorization: 'Bearer token' },
        payload: createPayload
      })

    it.each(['-1', '+1', '1.0', '1e3', 'abc', '9'.repeat(21), '0000000000000000000001'])(
      'POST should return the upstream 403 HTML when orgId is %s',
      async (orgId) => {
        const { statusCode, payload } = await postTo(encodeURIComponent(orgId))
        expect(statusCode).toBe(403)
        expect(payload).toContain('Request forbidden by administrative rules.')
      }
    )

    it.each(['0', '01', '9223372036854775807', '9'.repeat(20)])(
      'POST should accept orgId %s past validation error and return unknown organisation instead',
      async (orgId) => {
        const { statusCode, payload } = await postTo(orgId)
        expect(statusCode).toBe(404)
        expect(JSON.parse(payload).errorString).toBe('Organisation not found.')
      }
    )

    it('PUT should return the upstream 403 HTML when orgId is invalid', async () => {
      const { statusCode, payload } = await mockServer.inject({
        method: 'PUT',
        url: '/extapi/SitiAgriApi/authorisation/organisation/-1/authorisation/person/11111111',
        headers: { authorization: 'Bearer token' },
        payload: updatePayload
      })
      expect(statusCode).toBe(403)
      expect(payload).toContain('Request forbidden by administrative rules.')
    })

    it.each(['abc', 'null,null'])(
      'PUT should return the HTML 404 page when personId is %s',
      async (personId) => {
        const { statusCode, headers, payload } = await mockServer.inject({
          method: 'PUT',
          url: `/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/${encodeURIComponent(personId)}`,
          headers: { authorization: 'Bearer token' },
          payload: updatePayload
        })
        expect(statusCode).toBe(404)
        expect(headers['content-type']).toMatch(/^text\/html/)
        expect(payload).toContain('HTTP Status 404 – Not Found')
      }
    )

    it.each(['+11111111', '0011111111'])(
      'PUT should ignore leading zeros and plus sign in person id (personId %s)',
      async (personId) => {
        const { statusCode } = await mockServer.inject({
          method: 'PUT',
          url: `/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/${encodeURIComponent(personId)}`,
          headers: { authorization: 'Bearer token' },
          payload: updatePayload
        })
        expect(statusCode).toBe(200)
      }
    )

    it.each(['-1', '0'])('PUT should return 404 when personId is %s', async (personId) => {
      const { statusCode } = await mockServer.inject({
        method: 'PUT',
        url: `/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/${personId}`,
        headers: { authorization: 'Bearer token' },
        payload: updatePayload
      })
      expect(statusCode).toBe(404)
    })
  })

  describe('PUT 404s', () => {
    const put = (orgId, personId, payload) =>
      mockServer.inject({
        method: 'PUT',
        url: `/extapi/SitiAgriApi/authorisation/organisation/${orgId}/authorisation/person/${personId}`,
        headers: { authorization: 'Bearer token' },
        payload
      })

    it.each([
      ['personRoles', { ...updatePayload, personRoles: [{ role: 'Agent', personId: 999999999 }] }],
      [
        'personPrivileges',
        {
          ...updatePayload,
          personPrivileges: [{ personId: 999999999, privilegeNames: ['Amend - land'] }]
        }
      ]
    ])(
      'should return 404 Person not found when the %s personId differs from the path',
      async (_, payload) => {
        const { statusCode, payload: body } = await put(111111111, 11111111, payload)
        expect(statusCode).toBe(404)
        expect(JSON.parse(body)).toEqual({
          data: null,
          success: false,
          errorString: 'Person not found.'
        })
      }
    )

    it('should return 404 Organisation not found when the org does not exist', async () => {
      const { statusCode, payload: body } = await put(0, 11111111, updatePayload)
      expect(statusCode).toBe(404)
      expect(JSON.parse(body)).toEqual({
        data: null,
        success: false,
        errorString: 'Organisation not found.'
      })
    })
  })

  const upstreamError = { data: null, success: false, errorString: 'An error has occurred.' }

  describe('payload validation', () => {
    const inject = (method, url, payload) =>
      mockServer.inject({
        method,
        url: `/extapi/SitiAgriApi/authorisation/organisation/${url}`,
        headers: { authorization: 'Bearer token' },
        payload
      })
    const putUrl = '111111111/authorisation/person/11111111'
    const postUrl = '111111111/authorisation'

    it.each([
      ['PUT', putUrl, undefined],
      ['PUT', putUrl, { personRoles: [], personPrivileges: [{ privilegeNames: [] }] }],
      ['PUT', putUrl, { personRoles: [{ role: 'Agent' }], personPrivileges: [] }],
      ['POST', postUrl, undefined],
      ['POST', postUrl, {}],
      ['POST', postUrl, { personRoles: createPayload.personRoles }],
      ['POST', postUrl, { personRoles: [], personPrivileges: createPayload.personPrivileges }],
      ['POST', postUrl, { ...createPayload, personPrivileges: [{ privilegeNames: [] }] }]
    ])('%s %s with payload %j should return 500', async (method, url, payload) => {
      const { statusCode, payload: body } = await inject(method, url, payload)
      expect(statusCode).toBe(500)
      expect(JSON.parse(body)).toEqual(upstreamError)
    })

    it.each([[{}], [{ personRoles: [] }], [{ personPrivileges: [] }]])(
      'PUT with payload %j should return 400',
      async (payload) => {
        const { statusCode, payload: body } = await inject('PUT', putUrl, payload)
        expect(statusCode).toBe(400)
        expect(JSON.parse(body)).toEqual(upstreamError)
      }
    )

    it('PUT should check the person exists before the payload', async () => {
      const { statusCode, payload } = await inject('PUT', '111111111/authorisation/person/1', {})
      expect(statusCode).toBe(404)
      expect(JSON.parse(payload).errorString).toBe('Person not found.')
    })
  })

  describe('POST lookups', () => {
    const post = (orgId, payload) =>
      mockServer.inject({
        method: 'POST',
        url: `/extapi/SitiAgriApi/authorisation/organisation/${orgId}/authorisation`,
        headers: { authorization: 'Bearer token' },
        payload
      })
    const bodyForPerson = (personId, roles, privilegeNames) => ({
      personRoles: roles.map((role) => ({ role, personId })),
      personPrivileges: [{ personId, privilegeNames }]
    })

    it('should return 404 Person not found before checking the organisation', async () => {
      const { statusCode, payload } = await post(0, bodyForPerson(1, ['Agent'], []))
      expect(statusCode).toBe(404)
      expect(JSON.parse(payload)).toEqual({
        data: null,
        success: false,
        errorString: 'Person not found.'
      })
    })

    it('should return 404 Organisation not found for a known person', async () => {
      const { statusCode, payload } = await post(0, bodyForPerson(22222224, ['Agent'], []))
      expect(statusCode).toBe(404)
      expect(JSON.parse(payload)).toEqual({
        data: null,
        success: false,
        errorString: 'Organisation not found.'
      })
    })
  })

  describe('unrecognised fields', () => {
    const urls = {
      POST: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      PUT: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/11111111'
    }
    const role = { role: 'Agent', personId: 11111111 }
    const privilege = { personId: 11111111, privilegeNames: ['Amend - land'] }

    it.each(
      ['POST', 'PUT'].flatMap((method) => [
        [method, 'body', { personRoles: [role], personPrivileges: [privilege], x: 1 }],
        [
          method,
          'personRoles',
          { personRoles: [{ ...role, x: 1 }], personPrivileges: [privilege] }
        ],
        [
          method,
          'personPrivileges',
          { personRoles: [role], personPrivileges: [{ ...privilege, x: 1 }] }
        ]
      ])
    )(
      '%s should return a plain-text 400 naming the field in %s',
      async (method, where, payload) => {
        const {
          statusCode,
          headers,
          payload: body
        } = await mockServer.inject({
          method,
          url: urls[method],
          headers: { authorization: 'Bearer token' },
          payload
        })
        expect(statusCode).toBe(400)
        expect(headers['content-type']).toMatch(/^text\/plain/)
        expect(body).toBe(`Unrecognized field "x" in ${where}`)
      }
    )
  })
})
