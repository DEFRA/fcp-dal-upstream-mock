import Boom from '@hapi/boom'
import { crnIdCache } from '../../../fixtures/relations/crn-person-id.js'
import { sbiToOrgId } from '../../factories/id-lookups.js'
import {
  retrieveOrganisation,
  updateOrganisation
} from '../../factories/organisation/organisation.factory.js'

const idCrnCache = Object.fromEntries(Object.entries(crnIdCache).map(([crn, id]) => [id, crn]))

export const organisation = [
  {
    method: 'GET',
    path: '/organisation/{organisationId}',
    handler: async (request, h) => {
      console.error('EHRE')
      const organisationId = request.params.organisationId
      if (organisationId) {
        return h.response({ _data: retrieveOrganisation(organisationId) })
      }
    }
  },
  {
    method: 'POST',
    path: '/organisation/search',
    handler: async (request, h) => {
      const body = request.payload
      const sbi = body?.primarySearchPhrase

      if (
        !body?.searchFieldType ||
        // Only search by SBI supported by mock
        searchFieldType !== 'SBI' ||
        !sbi
      ) {
        return Boom.badRequest('Invalid or missing search parameters')
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
      if (request.params.organisationId) {
        return h.response({ _data: retrieveOrganisation(request.params.organisationId) })
      }
    }
  },
  {
    method: 'PUT',
    path: '/organisation/{organisationId}/business-details',
    handler: async (request, h) => {
      if (request.params.organisationId) {
        return h.response({
          _data: updateOrganisation(request.params.organisationId, request.payload)
        })
      }
    }
  }
]
