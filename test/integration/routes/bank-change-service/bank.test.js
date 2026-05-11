import Hapi from '@hapi/hapi'
import { bank } from '../../../../src/routes/bank-change-service/bank.js'

const url = '/bank-change-service/v1/submit'

const knownSbi = 1111111111

const validPayload = () => ({
  organisationId: '5583781',
  personId: '5020949',
  sbi: String(knownSbi),
  frn: '10014489653',
  crn: '1100209492',
  submissionDateTime: '02/05/2026 14:12:11',
  account: {
    accountType: 'UK_BUSINESS',
    name: 'John Doe',
    number: '14345678',
    bank: {
      name: 't1est',
      sortCode: '123456'
    }
  },
  country: { code: 'GB', currency: 'GBP' }
})

describe('POST /bank-change-service/v1/submit', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    server.route(bank)
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop()
  })

  describe('success scenarios', () => {
    it('returns 200 with an empty body for a fully populated valid request', async () => {
      const { result, statusCode } = await server.inject({
        method: 'POST',
        url,
        payload: validPayload()
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({})
    })

    it('returns 200 for a UK account without an explicit sortCode (now optional)', async () => {
      const payload = validPayload()
      delete payload.account.bank.sortCode
      const { statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(200)
    })

    it('returns 200 for an EU account with IBAN instead of account number', async () => {
      const payload = validPayload()
      payload.account = {
        accountType: 'EU',
        name: 'Jane Doe',
        iban: 'PT392831273127334616',
        bank: {
          name: 'Acme Bank',
          swiftCode: 'ABCDPTPL'
        }
      }
      payload.country = { code: 'PT', currency: 'EUR' }
      const { statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(200)
    })

    it('returns 200 with building society roll number', async () => {
      const payload = validPayload()
      payload.account.buildingSocietyRollNumber = '23123414'
      const { statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(200)
    })
  })

  describe('error scenarios', () => {
    it('returns 400 with code 20 when all top-level required fields are missing', async () => {
      const { result, statusCode } = await server.inject({
        method: 'POST',
        url,
        payload: {}
      })
      expect(statusCode).toBe(400)
      expect(result).toEqual({
        errors: [
          {
            code: 20,
            description:
              'Organisation id,Person id,SBI,FRN,CRN,Submission date/time,Account information is missing'
          }
        ]
      })
    })

    it('returns 400 listing missing account fields when account is empty', async () => {
      const payload = validPayload()
      payload.account = {}
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result).toEqual({
        errors: [
          {
            code: 20,
            description:
              'Account type,Account name,Account number or IBAN,Account bank details is missing'
          }
        ]
      })
    })

    it('returns 400 with code 20 when bank.name is missing (only required bank field)', async () => {
      const payload = validPayload()
      delete payload.account.bank.name
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0]).toEqual({ code: 20, description: 'Bank name is missing' })
    })

    it('returns 400 with code 20 when neither account.number nor account.iban is provided', async () => {
      const payload = validPayload()
      delete payload.account.number
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0]).toEqual({
        code: 20,
        description: 'Account number or IBAN is missing'
      })
    })

    it('returns 400 with code 20 when account type is not in the allowed enum', async () => {
      const payload = validPayload()
      payload.account.accountType = 'UNKNOWN'
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0].code).toBe(20)
      expect(result.errors[0].description).toMatch(/Unknown account type/)
    })

    it('returns 400 with code 20 when SBI is not found', async () => {
      const payload = validPayload()
      payload.sbi = '999999999'
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0].code).toBe(20)
      expect(result.errors[0].description).toMatch(/Organisation not found/)
    })

    it('returns 400 with code 20 for an unknown country code', async () => {
      const payload = validPayload()
      payload.country = { code: 'ZZ', currency: 'GBP' }
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0].code).toBe(20)
      expect(result.errors[0].description).toMatch(/country code/)
    })

    it('returns 400 with code 20 when currency does not match country code', async () => {
      const payload = validPayload()
      payload.country = { code: 'GB', currency: 'EUR' }
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0].code).toBe(20)
      expect(result.errors[0].description).toMatch(/Currency/)
    })
  })
})
