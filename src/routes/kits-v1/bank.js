import { sbiToOrgId } from '../../factories/id-lookups.js'

const VALID_CURRENCIES = new Set(['EUR', 'GBP'])

const countriesCurrency = {
  GB: 'GBP',
  IE: 'EUR',
  IRL: 'EUR',
  PT: 'EUR'
}

const ACCOUNT_TYPES = new Set(['EU', 'UK_PERSONAL', 'UK_BUSINESS'])

const ACCOUNT_NUMBER_MIN_LENGTH = 4

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
  if (!body.country || typeof body.country !== 'object') missing.push('Country information')
  return missing
}

const collectAccountMissing = (account) => {
  const missing = []
  if (!isPresent(account.accountType)) missing.push('Account type')
  if (!isPresent(account.name)) missing.push('Account name')
  // Schema requires `number` always — upstream NPEs on accountNumber.length() if missing,
  // even when `iban` is provided.
  if (!isPresent(account.number)) missing.push('Account number')
  if (!account.bank || typeof account.bank !== 'object') {
    missing.push('Account bank details')
  } else if (!isPresent(account.bank.name)) {
    missing.push('Bank name')
  }
  return missing
}

const collectCountryMissing = (country) => {
  const missing = []
  if (!isPresent(country.currency)) missing.push('Currency')
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

      if (body.account.number.length < ACCOUNT_NUMBER_MIN_LENGTH) {
        return errorResponse(
          h,
          400,
          UPSTREAM_ERROR_CODE,
          `Account number must be at least ${ACCOUNT_NUMBER_MIN_LENGTH} characters`
        )
      }

      if (!ACCOUNT_TYPES.has(body.account.accountType)) {
        return errorResponse(
          h,
          400,
          UPSTREAM_ERROR_CODE,
          `Unknown account type: ${body.account.accountType}`
        )
      }

      const countryMissing = collectCountryMissing(body.country)
      if (countryMissing.length > 0) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `${countryMissing.join(',')} is missing`)
      }

      const { country } = body
      if (!VALID_CURRENCIES.has(country.currency)) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `Unknown currency: ${country.currency}`)
      }
      if (country.code && !countriesCurrency[country.code]) {
        return errorResponse(h, 400, UPSTREAM_ERROR_CODE, `Unknown country code: ${country.code}`)
      }
      if (country.code && countriesCurrency[country.code] !== country.currency) {
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
