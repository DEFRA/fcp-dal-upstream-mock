import { sbiToOrgId } from '../../factories/id-lookups.js'

const countriesCurrency = {
  GB: 'GBP',
  IE: 'EUR',
  IRL: 'EUR',
  PT: 'EUR',
  US: 'USD'
}

const ACCOUNT_TYPES = new Set(['EU', 'UK_PERSONAL', 'UK_BUSINESS'])

// all 400s return code 20
const UPSTREAM_ERROR_CODE = 20

const isPresent = (value) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.length > 0
  return true
}

const errorResponse = (h, status, code, description) =>
  h.response({ errors: [{ code, description }] }).code(status)

const collectMissing = (body) => {
  const missing = []
  if (!isPresent(body.organisationId)) missing.push('Organisation id')
  if (!isPresent(body.personId)) missing.push('Person id')
  if (!isPresent(body.sbi)) missing.push('SBI')
  if (!isPresent(body.frn)) missing.push('FRN')
  if (!isPresent(body.crn)) missing.push('CRN')
  if (!isPresent(body.submissionDateTime)) missing.push('Submission date/time')
  if (!body.account || typeof body.account !== 'object') missing.push('Account information')
  return missing
}

const collectAccountMissing = (account) => {
  const missing = []
  if (!isPresent(account.accountType)) missing.push('Account type')
  if (!isPresent(account.name)) missing.push('Account name')
  if (!isPresent(account.number) && !isPresent(account.iban)) {
    missing.push('Account number or IBAN')
  }
  if (!account.bank || typeof account.bank !== 'object') {
    missing.push('Account bank details')
  } else if (!isPresent(account.bank.name)) {
    missing.push('Bank name')
  }
  return missing
}

export const bank = [
  {
    method: 'POST',
    path: '/bank-change-service/v1/submit',
    handler: async (request, h) => {
      const body = request.payload
      if (!body || typeof body !== 'object') {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, 'Request body is missing')
      }

      const missing = collectMissing(body)
      if (missing.length > 0) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `${missing.join(',')} is missing`)
      }

      const accountMissing = collectAccountMissing(body.account)
      if (accountMissing.length > 0) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `${accountMissing.join(',')} is missing`)
      }

      if (!ACCOUNT_TYPES.has(body.account.accountType)) {
        return errorResponse(
          h,
          400,
          UPSTREAM_ERROR_CODE,
          `Unknown account type: ${body.account.accountType}`
        )
      }

      const { country } = body
      if (country?.code && !countriesCurrency[country.code]) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `Unknown country code: ${country.code}`)
      }
      if (
        country?.code &&
        country?.currency &&
        countriesCurrency[country.code] !== country.currency
      ) {
        return errorResponse(
          h,
          400,
          UPSTREAM_ERROR_CODE,
          `Currency ${country.currency} does not match country code ${country.code}`
        )
      }

      if (!sbiToOrgId[body.sbi]) {
        return errorResponse(
          h,
          400,
          UPSTREAM_ERROR_CODE,
          `{"data":null,"success":false,"errorString":"Organisation not found."}`
        )
      }

      return h.response({}).code(200)
    }
  }
]

export const router = {
  plugin: {
    name: 'bank-change-service-router',
    register: (server, _options) => {
      server.route(bank)
    }
  }
}
