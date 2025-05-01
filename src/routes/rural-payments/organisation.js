import Boom from '@hapi/boom'
import {
  organisationByOrgId,
  organisationBySbi,
  organisationPeopleByOrgId
} from '../../plugins/data/organisation.js'

export const organisation = [
  {
    method: 'GET',
    path: '/v1/organisation/{orgId}',
    handler: async (request, h) => {
      const data = organisationByOrgId(request.params.orgId)

      if (!data) {
        return Boom.notFound('Organisation not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'POST',
    path: '/v1/organisation/search',
    handler: async (request, h) => {
      const body = request.payload
      if (!body?.searchFieldType || !body?.primarySearchPhrase) {
        return Boom.badRequest('Invalid or missing search parameters')
      }

      const data = organisationBySbi(body.primarySearchPhrase)

      if (!data) {
        return Boom.notFound('Organisation not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/authorisation/organisation/{orgId}',
    handler: async (request, h) => {
      const data = organisationPeopleByOrgId(request.params.orgId)

      if (!data) {
        return Boom.notFound('Organisation people not found')
      }

      return h.response(data)
    }
  }
]
