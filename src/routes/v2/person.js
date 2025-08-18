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
      try {
        // Reusable schema for fields allowing string (including empty), number (including unsafe), boolean, and null
        const flexibleTypeSchema = Joi.alternatives().try(
          Joi.string().allow(''),
          Joi.number().unsafe(), // Allow any number, including unsafe ones
          Joi.boolean(),
          Joi.valid(null)
        )

        // Reusable schema for fields allowing string (including empty), number (including unsafe), and boolean
        const requiredFlexibleTypeSchema = Joi.alternatives()
          .try(
            Joi.string().allow(''),
            Joi.number().unsafe(), // Allow any number, including unsafe ones
            Joi.boolean()
          )
          .required()

        // Reusable schema for fields allowing object, array, string (including empty), and null
        const contactInfoSchema = Joi.alternatives().try(
          Joi.object(),
          Joi.array(),
          Joi.string().allow(''),
          Joi.valid(null)
        )

        // Reusable schema for address subfields
        const addressFieldSchema = Joi.alternatives().try(
          Joi.object(),
          Joi.array(),
          Joi.string(),
          Joi.number().unsafe(), // Allow any number, including unsafe ones
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
            Joi.number().unsafe().integer(), // Allow any integer number, including unsafe ones
            Joi.string()
              .pattern(/^(-?[1-9][0-9]{9})?$/)
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
            }).unknown(true), // Allow arbitrary fields in address object
            Joi.valid(null)
          )
        }).unknown(true) // Allow arbitrary fields at top level

        await schema.validateAsync(request.payload)
      } catch (err) {
        console.log(err)
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
