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
      const organisationId = request.params.organisationId
      return h.response({ _data: retrieveOrganisation(organisationId) })
    }
  },
  {
    method: 'POST',
    path: '/organisation/search',
    handler: async (request, h) => {
      const body = request.payload
      const sbi = body?.primarySearchPhrase

      // Only search by SBI supported by mock
      // mimic the actual upstream responses...
      if (body?.searchFieldType !== 'SBI') {
        throw Boom.internal(
          'There was an error processing your request. It has been logged (ID someID)'
        )
      }
      if ((sbi?.length || 0) < 9) {
        throw Boom.badRequest('HTTP 400 Bad Request')
      }
      const orgId = sbiToOrgId[sbi]
      if (!orgId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      // TODO: check this response vs schema
      return h.response({
        _data: [retrieveOrganisation(orgId)],
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
