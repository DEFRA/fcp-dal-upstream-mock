import Boom from '@hapi/boom'
import Joi from 'joi'
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
      const body = request.payload
      const personId = parseInt(request.params.personId, 10)

      // personId must be a valid integer in range, and email header must be a user on the system
      if (isNaN(personId) || personId < 0 || `${personId}`.length > 20 || !request.headers.email) {
        throw Boom.forbidden(
          `bad personId: ${personId}, is not an integer in the acceptable range`,
          request
        )
      }
      // body must not be empty
      if (body === '' || body === null) {
        throw Boom.badRequest('empty request body not allowed', request)
        // TODO: should respond with `"source cannot be null"`
      }
      // body must be a parsable JSON object, not an array or other type
      if (typeof body !== 'object' || Array.isArray(body)) {
        throw Boom.badRequest('missing or invalid request body', request)
        // TODO: should respond with `{"code":400,"message":"Unable to process JSON"}`
      }
      // validate the body against the person schema
      try {
        const flexibleTypeSchema = Joi.alternatives().try(
          Joi.string().allow(''),
          Joi.number().unsafe(),
          Joi.boolean(),
          Joi.valid(null)
        )

        const requiredFlexibleTypeSchema = Joi.alternatives()
          .try(Joi.string().allow(''), Joi.number().unsafe(), Joi.boolean())
          .required()

        const contactInfoSchema = Joi.alternatives().try(
          Joi.object(),
          Joi.array(),
          Joi.string().allow(''),
          Joi.valid(null)
        )

        const addressFieldSchema = Joi.alternatives().try(
          Joi.object(),
          Joi.array(),
          Joi.string(),
          Joi.number().unsafe(),
          Joi.boolean(),
          Joi.valid(null)
        )

        const schema = Joi.object({
          title: flexibleTypeSchema,
          otherTitle: flexibleTypeSchema,
          firstName: requiredFlexibleTypeSchema,
          middleName: flexibleTypeSchema,
          lastName: requiredFlexibleTypeSchema,
          dateOfBirth: Joi.alternatives().try(
            Joi.number().unsafe().integer(),
            Joi.string()
              .pattern(/^([-]?\d+)?$/)
              .allow(''),
            Joi.valid(null)
          ),
          landline: contactInfoSchema,
          mobile: contactInfoSchema,
          email: contactInfoSchema,
          address: Joi.alternatives().try(
            Joi.object({
              address1: addressFieldSchema,
              address2: addressFieldSchema,
              address3: addressFieldSchema,
              address4: addressFieldSchema,
              address5: addressFieldSchema,
              pafOrganisationName: addressFieldSchema,
              flatName: addressFieldSchema,
              buildingNumberRange: addressFieldSchema,
              buildingName: addressFieldSchema,
              street: addressFieldSchema,
              city: addressFieldSchema,
              county: addressFieldSchema,
              postalCode: addressFieldSchema,
              country: addressFieldSchema,
              uprn: addressFieldSchema
            }).unknown(true),
            Joi.valid(null)
          )
        }).unknown(true)

        await schema.validateAsync(request.payload)
      } catch (err) {
        throw Boom.badData('validation error while processing input', { error: err, request })
      }

      updatePerson(personId, body)

      return h.response().code(204)
    }
  }
]
