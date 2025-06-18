import Boom from '@hapi/boom'
import { sbiToOrgId } from '../../factories/id-lookups.js'
import {
  retrieveOrganisation,
  updateOrganisation
} from '../../factories/organisation/organisation.factory.js'
import { pagination } from '../../plugins/data/pagination.js'

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
      if (body?.searchFieldType !== 'SBI') {
        throw Boom.badRequest('Invalid or missing search parameters')
      }

      const orgId = sbiToOrgId[sbi]
      if (!orgId) {
        return h.response({ _data: [], _page: pagination0 })
      }

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
