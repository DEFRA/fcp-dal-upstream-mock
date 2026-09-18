import Boom from '@hapi/boom'
import { createLogger } from '../../common/helpers/logging/logger.js'
import { config } from '../../config.js'
import { fakeId, paginate, safeSeed } from '../../factories/common.js'
import { crnToPersonId } from '../../factories/id-lookups.js'
import {
  allPeople,
  retrievePerson,
  retrievePersonOrgs,
  searchPeople,
  updatePerson
} from '../../factories/person/person.factory.js'
import { checkSearchPhrase } from '../../utils/shared-datatypes.js'
import { createPayloadValidator } from '../../utils/validatePayload.js'

const logger = createLogger('person.route')

// `primarySearchPhrase` constraints for each searchFieldType
const searchFieldTypes = {
  CUSTOMER_REFERENCE: { minLength: 10, minNumber: 1000000000 },
  PERSONAL_IDENTIFIER: { minLength: 9, minNumber: 100000000 },
  CUSTOMER_NAME: { minLength: 1, allowBoolean: true },
  CUSTOMER_POSTCODE: { minLength: 5, minNumber: 10000 },
  VENDOR_NUMBER: { minLength: 6, minNumber: 100000 },
  TRADER_NUMBER: { minLength: 6, minNumber: 100000 }
}

const mapPersonToSearchResult = ({
  id,
  firstName,
  lastName,
  address,
  personalIdentifiers,
  nationalInsuranceNumber,
  customerReferenceNumber,
  email,
  locked,
  deactivated
}) => ({
  id,
  fullName: [firstName, lastName].filter(Boolean).join(' '),
  primaryAddress: address,
  personalIdentifiers,
  nationalInsuranceNumber: nationalInsuranceNumber || null,
  customerReference: customerReferenceNumber,
  email,
  locked,
  deactivated
})

const mapPersonToPartyDigitalContact = ({ id, emailValidated, email }, requestEmail) => {
  safeSeed([id, 'partyDigitalContactId'])

  return {
    id: fakeId(),
    partyId: id, // partyId is the personId here (a party can also be an organisation elsewhere)
    mdmPartyContactId: null,
    digitalContactType: { id: 100301, type: 'Email Address' }, // 100301 = EMAIL_ADDRESS (not 100306 CORRESPONDENCE_EMAIL)
    digitalAddress: email, // Bit unusual, but the API echos back the same email address passed in the url params
    validated:
      email === requestEmail &&
      emailValidated /* Not been able to confirm this is how this works as we only have 1
    // external test account with an unvalidated account and no email support */
  }
}

const validateUpdatePersonPayload = await createPayloadValidator(
  'routes/kits-v1/person-schema.oas.yml',
  (schema) => schema.paths['/person/{personId}'].put.requestBody.content['application/json'].schema
)

/**
 * Get the personId from the request params
 * @param {*} request
 * @returns personId
 * @throws {Boom.Boom} 403 if personId is not an integer in the acceptable range
 */
const checkPersonId = (request) => {
  const personId = Number.parseInt(request.params.personId, 10)

  if (Number.isNaN(personId) || personId < 0 || `${personId}`.length > 20) {
    throw Boom.forbidden(
      `bad personId: ${personId}, is not an integer in the acceptable range`,
      request
    )
  }

  return personId
}

export const person = [
  {
    method: 'GET',
    path: '/person/{email}/validateEmail',
    handler: async (request, h) => {
      const email = request.params.email.toLowerCase()
      const emailDuplicated = allPeople().some(
        (person) => person.email?.toLowerCase() === email && person.emailValidated
      )
      return h.response({ _data: { emailDuplicated } })
    }
  },
  {
    method: 'GET',
    path: '/person/{personId}/{email}/confirm',
    handler: async (request, h) => {
      const personId = checkPersonId(request)
      const person = retrievePerson(personId)

      if (!person.email) {
        throw Boom.notFound()
      }

      return h.response({ _data: mapPersonToPartyDigitalContact(person, request.params.email) })
    }
  },
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
    method: 'POST',
    path: '/person/search',
    handler: async (request, h) => {
      const { searchFieldType, searchPhrase } = checkSearchPhrase(request, searchFieldTypes)
      const { offset, limit } = request.payload

      const matches = searchPeople(searchFieldType, searchPhrase)
      const { data, page } = paginate(matches, offset, limit)

      return h.response({
        _data: data.map(mapPersonToSearchResult),
        _page: page
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
        logger.info(
          `validateUpdatePersonPayload failed: ${JSON.stringify(validateUpdatePersonPayload.errors)}`
        )
        throw Boom.badData('validation error while processing input', request)
      }

      if (body.dateOfBirth != null && body.dateOfBirth > Date.now()) {
        logger.info(`dateOfBirth is in the future: ${body.dateOfBirth}`)
        throw Boom.badData('validation error while processing input', request)
      }

      updatePerson(personId, body)
      return h.response().code(204)
    }
  }
]
