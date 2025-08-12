import Boom from '@hapi/boom'
import { config } from '../../config.js'
import { crnToPersonId } from '../../factories/id-lookups.js'
import {
  retrievePerson,
  retrievePersonOrgs,
  updatePerson
} from '../../factories/person/person.factory.js'
import { pagination, pagination0 } from '../../plugins/data/pagination.js'

export const person = [
  {
    method: 'GET',
    path: '/person/{personId}/summary',
    handler: async (request, h) => {
      let personId = parseInt(request.params.personId, 10)
      if (personId === config.get('personIdOverride')) {
        const crn = request?.headers?.crn
        // override with personId obtained from crn request header
        personId = crnToPersonId[crn]
      }
      if (isNaN(personId) || personId < 0 || `${personId}`.length > 20) {
        throw Boom.forbidden(
          `bad personId: ${personId}, is not an integer in the acceptable range`,
          request
        )
      }
      const { role, privileges, lastUpdatedOn, ...personData } = retrievePerson(personId)

      return h.response({ _data: personData })
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
      let personId = parseInt(request.params.personId, 10)
      if (isNaN(personId) || personId < 0 || `${personId}`.length > 20) {
        throw Boom.forbidden(
          `bad personId: ${personId}, is not an integer in the acceptable range`,
          request
        )
      }

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
    async handler(request, h) {
      try {
        Joi.object({
          title: Joi.string(),
          otherTitle: Joi.string(),
          firstName: Joi.string().required(),
          middleName: Joi.string(),
          lastName: Joi.string().required(),
          dateOfBirth: Joi.number().integer(),
          landline: Joi.string(),
          mobile: Joi.string(),
          email: Joi.string().email(),
          address: Joi.object({
            address1: Joi.string(),
            address2: Joi.string(),
            address3: Joi.string(),
            address4: Joi.string(),
            address5: Joi.string(),
            pafOrganisationName: Joi.string(),
            flatName: Joi.string(),
            buildingNumberRange: Joi.string(),
            buildingName: Joi.string(),
            street: Joi.string(),
            city: Joi.string(),
            county: Joi.string(),
            postalCode: Joi.string(),
            country: Joi.string(),
            uprn: Joi.string(),
            dependentLocality: Joi.string(),
            doubleDependentLocality: Joi.string(),
            addressTypeId: Joi.string()
          })
        }).validateAsync(request.payload)
      } catch (err) {
        throw Boom.badData('HTTP 422')
      }

      const personId = parseInt(request.params.personId, 10)

      if (isNaN(personId) || personId < 0 || `${personId}`.length > 20 || !request.headers.email) {
        throw Boom.forbidden('Request forbidden by administrative rules.', request)
      }

      updatePerson(personId, request.payload)

      return h.response().code(204)
    }
  }
]
