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
      payload: createPayload
    })
    expect(statusCode).toBe(201)
    const body = JSON.parse(payload)
    expect(body._data).toEqual(
      expect.arrayContaining([expect.objectContaining({ personId: 22222220, role: 'Agent' })])
    )
  })

  it('POST should return 409 when the person is already authorised on the organisation', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
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
            privilegeNames: ['Amend - business']
          }
        ]
      }
    })
    expect(statusCode).toBe(409)
  })

  it('POST should return 403 when email header is present (CV user)', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'POST',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation',
      headers: { email: 'cv@example.com' },
      payload: createPayload
    })
    expect(statusCode).toBe(403)
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
      payload: updatePayload
    })
    expect(statusCode).toBe(200)
    const body = JSON.parse(payload)
    expect(body._data).toEqual(
      expect.objectContaining({
        personId: 11111111,
        privileges: expect.arrayContaining(['Amend - land'])
      })
    )
  })

  it('PUT should persist sibling personRoles and personPrivileges on the person', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/11111111',
      payload: updatePayload
    })
    expect(statusCode).toBe(200)

    const readBack = await mockServer.inject({
      method: 'GET',
      url: '/extapi/authorisation/organisation/111111111'
    })
    expect(readBack.statusCode).toBe(200)
    const customers = JSON.parse(readBack.payload)._data
    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 11111111,
          role: 'Agent',
          privileges: expect.arrayContaining(['Amend - land', 'Submit - cs app'])
        })
      ])
    )
  })

  it('PUT should return 403 when email header is present (CV user)', async () => {
    const { statusCode } = await mockServer.inject({
      method: 'PUT',
      url: '/extapi/SitiAgriApi/authorisation/organisation/111111111/authorisation/person/11111111',
      headers: { email: 'cv@example.com' },
      payload: { personRoles: [] }
    })
    expect(statusCode).toBe(403)
  })
})
