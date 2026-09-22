import Hapi from '@hapi/hapi'
import { emailValidation } from '../../../../../src/routes/kits-v1/email-validation.js'

const saveUrl = '/external-auth/email-validation'
const validateUrl = '/external-auth/email-validation/validate-email'

const validPayload = (overrides = {}) => ({
  customerReference: '1111111100',
  partyDigitalContactId: 123456,
  email: `${overrides.customerReference ?? '1111111100'}@example.com`,
  linkSentDate: new Date().toISOString(),
  ...overrides
})

let server

beforeAll(async () => {
  server = Hapi.server()
  server.route(emailValidation)
  await server.initialize()
})

afterAll(async () => {
  await server.stop()
})

describe('POST /external-auth/email-validation', () => {
  it('returns 200 when saving a new record', async () => {
    const { statusCode } = await server.inject({
      method: 'POST',
      url: saveUrl,
      payload: validPayload({ customerReference: '2222222200' })
    })
    expect(statusCode).toBe(200)
  })

  it('returns 200 when replacing an existing record for the same CRN', async () => {
    const payload = validPayload({ customerReference: '3333333300' })
    await server.inject({ method: 'POST', url: saveUrl, payload })

    const { statusCode } = await server.inject({
      method: 'POST',
      url: saveUrl,
      payload: { ...payload, email: 'someone-else@example.com' }
    })
    expect(statusCode).toBe(200)
  })

  it('returns 403 when the email is already associated with a different CRN', async () => {
    const payload = validPayload({ customerReference: '4444444400', email: 'taken@example.com' })
    await server.inject({ method: 'POST', url: saveUrl, payload })

    const { statusCode } = await server.inject({
      method: 'POST',
      url: saveUrl,
      payload: { ...payload, customerReference: '5555555500' }
    })
    expect(statusCode).toBe(403)
  })
})

describe('POST /external-auth/email-validation/validate-email', () => {
  it('returns 404 when no record exists for the CRN', async () => {
    const { statusCode } = await server.inject({
      method: 'POST',
      url: validateUrl,
      payload: validPayload({ customerReference: '6666666600' })
    })
    expect(statusCode).toBe(404)
  })

  it('returns 200 when the record matches and the link has not expired', async () => {
    const payload = validPayload({ customerReference: '7777777700' })
    await server.inject({ method: 'POST', url: saveUrl, payload })

    const { statusCode } = await server.inject({
      method: 'POST',
      url: validateUrl,
      payload
    })
    expect(statusCode).toBe(200)
  })

  it('returns 401 when the link has expired', async () => {
    const payload = validPayload({
      customerReference: '8888888800',
      linkSentDate: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
    })
    await server.inject({ method: 'POST', url: saveUrl, payload })

    const { statusCode } = await server.inject({
      method: 'POST',
      url: validateUrl,
      payload
    })
    expect(statusCode).toBe(401)
  })

  it('returns 404 when the email does not match the saved record', async () => {
    const payload = validPayload({ customerReference: '9999999900' })
    await server.inject({ method: 'POST', url: saveUrl, payload })

    const { statusCode } = await server.inject({
      method: 'POST',
      url: validateUrl,
      payload: { ...payload, email: 'wrong@example.com' }
    })
    expect(statusCode).toBe(404)
  })
})
