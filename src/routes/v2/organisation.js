import Boom from '@hapi/boom'
import { sbiToOrgId } from '../../factories/id-lookups.js'
import {
  retrieveOrganisation,
  updateOrganisation
} from '../../factories/organisation/organisation.factory.js'
import { pagination, pagination0 } from '../../plugins/data/pagination.js'

export const organisation = [
  {
    method: 'GET',
    path: '/organisation/{organisationId}',
    handler: async (request, h) => {
      const organisationId = parseInt(request.params.organisationId, 10)

      if (isNaN(organisationId) || organisationId < 0 || `${organisationId}`.length > 20) {
        throw Boom.forbidden(
          `bad organisationId: ${organisationId}, is not an integer in the acceptable range`,
          request
        )
      }

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
      return h.response({ _data: retrieveOrganisation(request.params.organisationId) })
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
  }
]
