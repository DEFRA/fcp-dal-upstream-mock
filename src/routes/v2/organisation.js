import Boom from '@hapi/boom'
import { sbiToOrgId } from '../../factories/id-lookups.js'
import {
  createOrganisation,
  lockOrganisation,
  retrieveOrganisation,
  retrieveOrganisationCustomers,
  unlockOrganisation,
  updateAdditionalOrganisationDetails,
  updateOrganisation
} from '../../factories/organisation/organisation.factory.js'
import { pagination, pagination0 } from '../../plugins/data/pagination.js'
import { checkId, checkRequestBody } from '../../utils/shared-datatypes.js'
import { createPayloadValidator } from '../../utils/validatePayload.js'

const validateLockOrganisationPayload = await createPayloadValidator(
  'routes/v2/organisation-schema.oas.yml',
  (schema) =>
    schema.paths['/organisation/{organisationId}/lock'].post.requestBody.content['application/json']
      .schema
)

const validateUnlockOrganisationPayload = await createPayloadValidator(
  'routes/v2/organisation-schema.oas.yml',
  (schema) =>
    schema.paths['/organisation/{organisationId}/unlock'].post.requestBody.content[
      'application/json'
    ].schema
)

export const organisation = [
  {
    method: 'GET',
    path: '/organisation/{organisationId}',
    handler: async (request, h) => {
      const organisationId = checkId(request, 'organisationId')

      return h.response({ _data: retrieveOrganisation(organisationId) })
    }
  },
  {
    method: 'POST',
    path: '/organisation/search',
    handler: async (request, h) => {
      const body = request.payload
      const searchSbi = body?.primarySearchPhrase

      // Only search by SBI supported by mock
      if (
        !searchSbi ||
        body?.searchFieldType !== 'SBI' ||
        !(typeof searchSbi === 'number' || typeof searchSbi === 'string')
      ) {
        // mimic the actual upstream response for missing searchFieldType
        throw Boom.internal(
          'missing or invalid searchFieldType/primarySearchPhrase, expected "SBI" and SBI number\n' +
            `searchFieldType: '${body?.searchFieldType}', primarySearchPhrase: '${searchSbi}'`,
          request
        )
      }

      // SBI must be at least 9 characters long
      if (
        // upstream checks the character length of the number
        (`${searchSbi}`?.length || 0) < 9 ||
        // we also have to check for a big enough integer to satisfy the schema
        (typeof searchSbi === 'number' && searchSbi < 100000000)
      ) {
        throw Boom.badRequest(`bad SBI: ${searchSbi}, it must comprise 9 or more digits`, request)
      }

      // return empty result if no orgId found but no "errors" encountered
      const orgId = sbiToOrgId[searchSbi]
      if (!orgId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      // reduce the response to the subset of fields for search results
      const {
        id,
        name,
        sbi,
        additionalSbiIds,
        confirmed,
        lastUpdatedOn,
        landConfirmed,
        deactivated,
        locked,
        address,
        correspondenceAddress,
        isFinancialToBusinessAddr,
        isCorrespondenceAsBusinessAddr
      } = retrieveOrganisation(orgId)
      return h.response({
        _data: [
          {
            id,
            name,
            sbi,
            additionalSbiIds,
            confirmed,
            lastUpdatedOn,
            landConfirmed,
            deactivated,
            locked,
            address,
            correspondenceAddress,
            isFinancialToBusinessAddr,
            isCorrespondenceAsBusinessAddr
          }
        ],
        _page: pagination
      })
    }
  },
  {
    method: 'GET',
    path: '/authorisation/organisation/{organisationId}',
    handler: async (request, h) => {
      return h.response({ _data: retrieveOrganisationCustomers(request.params.organisationId) })
    }
  },
  {
    method: 'PUT',
    path: '/organisation/{organisationId}/business-details',
    handler: async (request, h) => {
      return h.response({
        _data: updateOrganisation(request.params.organisationId, request.payload)
      })
    }
  },
  {
    method: 'PUT',
    path: '/organisation/{organisationId}/additional-business-details',
    handler: async (request, h) => {
      const organisationId = checkId(request, 'organisationId')
      const body = request.payload

      if (
        typeof body !== 'object' ||
        Array.isArray(body) ||
        body === null ||
        // required fields
        !body.businessType?.id ||
        !body.legalStatus?.id
      ) {
        throw Boom.badRequest(`bad payload: ${body}, expected an object`, request)
      }

      try {
        updateAdditionalOrganisationDetails(organisationId, body)
      } catch (e) {
        if (e.isBoom) {
          // 404 is a 500 upstream!!
          throw Boom.internal(`Organisation with ID: ${organisationId} not found`, request)
        }
        throw e
      }

      return h.response().code(204)
    }
  },
  {
    method: 'POST',
    path: '/organisation/create/{personId}',
    handler: async (request, h) => {
      return h.response({
        _data: createOrganisation(request.params.personId, request.payload)
      })
    }
  },
  {
    method: 'POST',
    path: '/organisation/{organisationId}/lock',
    handler: async (request, h) => {
      const organisationId = checkId(request, 'organisationId')
      checkRequestBody(request)

      if (!validateLockOrganisationPayload(request.payload)) {
        throw Boom.badRequest('validation error while processing input', request)
      }

      lockOrganisation(organisationId)

      return h.response()
    }
  },
  {
    method: 'POST',
    path: '/organisation/{organisationId}/unlock',
    handler: async (request, h) => {
      const organisationId = checkId(request, 'organisationId')
      checkRequestBody(request)

      if (!validateUnlockOrganisationPayload(request.payload)) {
        throw Boom.badRequest('validation error while processing input', request)
      }

      unlockOrganisation(organisationId)

      return h.response()
    }
  }
]
