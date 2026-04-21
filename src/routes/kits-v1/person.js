import Boom from '@hapi/boom'
import { config } from '../../config.js'
import { pagination, pagination0 } from '../../factories/common.js'
import { crnToPersonId } from '../../factories/id-lookups.js'
import {
  retrievePerson,
  retrievePersonOrgs,
  updatePerson
} from '../../factories/person/person.factory.js'
import { createPayloadValidator } from '../../utils/validatePayload.js'

const validateUpdatePersonPayload = await createPayloadValidator(
  'routes/kits-v1/person-schema.oas.yml',
  (schema) => schema.paths['/person/{personId}'].put.requestBody.content['application/json'].schema
)

const checkPersonId = (request) => {
  const personId = parseInt(request.params.personId, 10)

  if (isNaN(personId) || personId < 0 || `${personId}`.length > 20) {
    throw Boom.forbidden(
      `bad personId: ${personId}, is not an integer in the acceptable range`,
      request
    )
  }

  return personId
}

const validateEmailAddress = (emailAddress) => {
  const localPart = emailAddress.split('@')[0]

  // If the local part of the email is a number in (a selection of) the 4XX/5XX range, then return that as a status code
  if (Number.isInteger(Number(localPart))) {
    const statusCode = Number(localPart)

    // Keeping the implementation simple here, only supporting a small subset of status codes.
    // All other numbers treated as a valid email address
    const validStatusCode = new Set([400, 401, 403, 404, 500]).has(statusCode)
    if (validStatusCode) {
      throw new Boom.Boom(`Simulated service failure with status code ${validStatusCode}`, {
        statusCode: statusCode
      })
    }
  }
}

export const person = [
  {
    method: 'GET',
    path: '/person/{personId}/summary',
    handler: async (request, h) => {
      let personId = checkPersonId(request)

      if (personId === config.get('personIdOverride')) {
        const crn = request?.headers?.crn
        personId = crnToPersonId[crn]
      }

      const { role, privileges, lastUpdatedOn, ...personData } = retrievePerson(personId)

      return h.response({ _data: personData })
    }
  },
  {
    method: 'GET',
    path: '/person/{emailAddress}/validateEmail',
    handler: async (request, h) => {
      const emailAddress = request.params.emailAddress

      validateEmailAddress(emailAddress)

      const emailDuplicated = emailAddress.includes('exists')
      return h.response({ _data: { emailDuplicated } })
    }
  },
  {
    method: 'POST',
    path: '/person/search',
    handler: async (request, h) => {
      const body = request.payload
      const crn = body?.primarySearchPhrase

      // Only search by CRN supported by mock
      if (
        !crn ||
        body?.searchFieldType !== 'CUSTOMER_REFERENCE' ||
        !(typeof crn === 'number' || typeof crn === 'string')
      ) {
        // mimic the actual upstream response for missing searchFieldType
        throw Boom.internal(
          'invalid searchFieldType/primarySearchPhrase, expected "CUSTOMER_REFERENCE" and CRN\n' +
            `searchFieldType: '${body?.searchFieldType}', primarySearchPhrase: '${crn}'`,
          request
        )
      }

      // CRN must be at least 10 characters long
      if (
        // upstream checks the character length of the number
        (`${crn}`?.length || 0) < 10 ||
        // we also have to check for a big enough integer to satisfy the schema
        (typeof crn === 'number' && searchSbi < 1000000000)
      ) {
        throw Boom.badRequest(`bad CRN: ${crn}, it must comprise 10 or more digits`, request)
      }

      // return empty result if no personId found but no "errors" encountered
      const personId = crnToPersonId[crn]
      if (!personId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      // reduce the response to the subset of fields for search results
      const {
        id,
        firstName,
        lastName,
        address,
        personalIdentifiers,
        nationalInsuranceNumber, // not currently part of the full person object!!
        customerReferenceNumber,
        email,
        locked,
        deactivated
      } = retrievePerson(personId)
      return h.response({
        _data: [
          {
            id,
            fullName: `${firstName} ${lastName}`,
            primaryAddress: address,
            personalIdentifiers,
            nationalInsuranceNumber: nationalInsuranceNumber || null,
            customerReference: customerReferenceNumber,
            email,
            locked,
            deactivated
          }
        ],
        _page: pagination
      })
    }
  },
  {
    method: 'GET',
    path: '/organisation/person/{personId}/summary',
    handler: async (request, h) => {
      const personId = checkPersonId(request)

      const orgs = retrievePersonOrgs(personId)

      return h.response({
        _data: orgs,
        _page: {
          number: 1,
          size: 500,
          totalPages: 1,
          numberOfElements: orgs.length,
          totalElements: orgs.length
        }
      })
    }
  },
  {
    method: 'PUT',
    path: '/person/{personId}',
    handler: async (request, h) => {
      const personId = checkPersonId(request)
      const body = request.payload

      if (body === '' || body === null) {
        throw Boom.badRequest('empty request body not allowed', request)
      }

      if (typeof body !== 'object' || Array.isArray(body)) {
        throw Boom.badRequest('missing or invalid request body', request)
      }

      if (!validateUpdatePersonPayload(request.payload)) {
        throw Boom.badData('validation error while processing input', request)
      }

      updatePerson(personId, body)
      return h.response().code(204)
    }
  }
]
