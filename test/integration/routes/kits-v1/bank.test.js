import Hapi from '@hapi/hapi'
import { bank } from '../../../../src/routes/kits-v1/bank.js'

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

    it('returns 200 for an EU account with both number and IBAN', async () => {
      const payload = validPayload()
      payload.account = {
        accountType: 'EU',
        name: 'Jane Doe',
        number: '12345678',
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
              'Organisation id,Person id,SBI,FRN,CRN,Submission date/time,Account information,Country information is missing'
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
            description: 'Account type,Account name,Account number,Account bank details is missing'
          }
        ]
      })
    })

    it.each([
      {
        name: 'bank.name is missing',
        mutate: (p) => {
          delete p.account.bank.name
        },
        expected: /Bank name is missing/
      },
      {
        name: 'account.number is missing (even when iban is provided)',
        mutate: (p) => {
          delete p.account.number
          p.account.iban = 'PT392831273127334616'
        },
        expected: /Account number is missing/
      },
      {
        name: 'account.number is shorter than 4 chars',
        mutate: (p) => {
          p.account.number = '123'
        },
        expected: /at least 4 characters/
      },
      {
        name: 'account type is not in the allowed enum',
        mutate: (p) => {
          p.account.accountType = 'UNKNOWN'
        },
        expected: /Unknown account type/
      },
      {
        name: 'SBI is not found',
        mutate: (p) => {
          p.sbi = '999999999'
        },
        expected: /Organisation not found/
      },
      {
        name: 'country is missing',
        mutate: (p) => {
          delete p.country
        },
        expected: /Country information is missing/
      },
      {
        name: 'country.currency is missing',
        mutate: (p) => {
          p.country = { code: 'GB' }
        },
        expected: /Currency is missing/
      },
      {
        name: 'currency is not in the EUR/GBP enum',
        mutate: (p) => {
          p.country = { code: 'US', currency: 'USD' }
        },
        expected: /Unknown currency/
      },
      {
        name: 'country code is unknown',
        mutate: (p) => {
          p.country = { code: 'ZZ', currency: 'GBP' }
        },
        expected: /country code/
      },
      {
        name: 'currency does not match country code',
        mutate: (p) => {
          p.country = { code: 'GB', currency: 'EUR' }
        },
        expected: /Currency/
      }
    ])('returns 400 with code 20 when $name', async ({ mutate, expected }) => {
      const payload = validPayload()
      mutate(payload)
      const { result, statusCode } = await server.inject({ method: 'POST', url, payload })
      expect(statusCode).toBe(400)
      expect(result.errors[0].code).toBe(20)
      expect(result.errors[0].description).toMatch(expected)
    })
  })
})
