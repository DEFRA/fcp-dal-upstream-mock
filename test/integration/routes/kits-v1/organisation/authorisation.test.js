import { describe, it, beforeAll, afterAll, expect } from 'vitest'

describe('Authorisation create & update (Ticket #29)', () => {
  let mockServer
  const PROCESS_ENV = process.env

  beforeAll(async () => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '3098'
    const { startServer } = await import('../../../../../src/server.js')
    mockServer = await startServer()
  })

  afterAll(() => {
    process.env = PROCESS_ENV
    mockServer?.stop({ timeout: 0 })
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
    expect(statusCode).toBe(201)
    const body = JSON.parse(payload)
    expect(body).toEqual(
      expect.arrayContaining([expect.objectContaining({ personId: 22222220, role: 'Agent' })])
    )
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
    expect(body).toEqual({ success: false, errorString: 'Relation already exists' })
  })

  it('POST should return 401 when authorization header is missing or invalid', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { authorization: 'Bearer wrong-token' },
      payload: createPayload
    })
    expect(statusCode).toBe(401)
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
    expect(body).toEqual(
      expect.objectContaining({
        personId: 11111111,
        privileges: expect.arrayContaining(['Amend - land'])
      })
    )
  })

  it('PUT should reject identical payload with 409 Relation already exists (not idempotent)', async () => {
    // 22222222 is NOT initially linked to org 111111111 — guaranteed clean start
    const payload = {
      personRoles: [{ role: 'Agent', personId: 22222222 }],
      personPrivileges: [
        { personId: 22222222, privilegeNames: ['Amend - land', 'Submit - cs app'] }
      ]
    }

    // Create the initial link via POST (clean path)
    const create = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { authorization: 'Bearer token' },
      payload
    })
    expect(create.statusCode).toBe(201)

    // First PUT with the same payload must fail with 409 because the relation now exists
    const first = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/22222222',
      headers: { authorization: 'Bearer token' },
      payload
    })
    expect(first.statusCode).toBe(409)
    const body = JSON.parse(first.payload)
    expect(body).toEqual({ success: false, errorString: 'Relation already exists' })
  })

  it('PUT should return 401 when authorization header is missing or invalid', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/11111111',
      headers: { authorization: 'Bearer wrong-token' },
      payload: { personRoles: [] }
    })
    expect(statusCode).toBe(401)
  })
})
