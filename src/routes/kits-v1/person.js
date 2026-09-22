import Boom from '@hapi/boom'
import { createLogger } from '../../common/helpers/logging/logger.js'
import { config } from '../../config.js'
import { paginate } from '../../factories/common.js'
import {
  crnToPersonId,
  digitalContactPartyIdToPersonId,
  personIdToDigitalContactPartyId
} from '../../factories/id-lookups.js'
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

const mapPersonToPartyDigitalContact = ({ id, emailValidated, email }, requestEmail) => ({
  id: personIdToDigitalContactPartyId[id],
  partyId: id, // partyId is the personId here (a party can also be an organisation elsewhere)
  mdmPartyContactId: null,
  digitalContactType: { id: 100301, type: 'Email Address' }, // 100301 = EMAIL_ADDRESS (not 100306 CORRESPONDENCE_EMAIL)
  digitalAddress: email, // Bit unusual, but the API echos back the same email address passed in the url params
  validated:
    email === requestEmail &&
    emailValidated /* Not been able to confirm this is how this works as we only have 1
    // external test account with an unvalidated account and no email support */
})

const validateUpdatePersonPayload = await createPayloadValidator(
  'routes/kits-v1/person-schema.oas.yml',
  (schema) => schema.paths['/person/{personId}'].put.requestBody.content['application/json'].schema
)

/**
 * Get an integer path param from the request, in the range accepted by upstream
 * @param {*} request
 * @param {string} paramName
 * @returns the parsed id
 * @throws {Boom.Boom} 403 if the param is not an integer in the acceptable range
 */
const checkPathId = (request, paramName) => {
  const id = Number.parseInt(request.params[paramName], 10)

  if (Number.isNaN(id) || id < 0 || `${id}`.length > 20) {
    throw Boom.forbidden(
      `bad ${paramName}: ${id}, is not an integer in the acceptable range`,
      request
    )
  }

  return id
}

const checkPersonId = (request) => checkPathId(request, 'personId')
const checkDigitalContactPartyId = (request) => checkPathId(request, 'digitalContactPartyId')

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

      if (
        person.email.toLowerCase() === request.params.email.toLowerCase() &&
        person.emailValidated
      ) {
        throw Boom.conflict('Email address is already verified', request)
      }

      return h.response({ _data: mapPersonToPartyDigitalContact(person, request.params.email) })
    }
  },
  {
    method: 'POST',
    path: '/verify-email/{digitalContactPartyId}',
    handler: async (request, h) => {
      const digitalContactPartyId = checkDigitalContactPartyId(request)
      const personId = digitalContactPartyIdToPersonId[digitalContactPartyId]

      if (personId === undefined) {
        // After testing this end point in cdp test (upgrade), is seems to return success regardless of whether the person is found.
        // Leaving this as a 404 for now, but need to remove this check as well as from the person-schema.oas.yml
        // if the behaviour is the same in cdp ext-test (perf-test)
        throw Boom.notFound()
      }

      return h.response({ _data: 'Success' })
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
