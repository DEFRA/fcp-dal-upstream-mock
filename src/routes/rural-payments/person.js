import Boom from '@hapi/boom'
import { organisationPersonSummary } from '../../plugins/data/organisation.js'
import { pagination } from '../../plugins/data/pagination.js'
import { personByCrn, personById } from '../../plugins/data/person.js'

export const person = [
  {
    method: 'GET',
    path: '/v1/person/{personId}/summary',
    handler: async (request, h) => {
      const data = personById(request.params.personId)

      if (!data) {
        return Boom.notFound('Person not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'POST',
    path: '/v1/person/search',
    handler: async (request, h) => {
      const body = request.payload

      if (!body?.searchFieldType || !body?.primarySearchPhrase) {
        return Boom.badRequest('Invalid or missing search parameters')
      }

      const data = personByCrn(body.primarySearchPhrase)

      if (!data) {
        return Boom.notFound('Person not found')
      }

      return h.response({
        _data: [data._data],
        _page: pagination
      })
    }
  },
  {
    method: 'GET',
    path: '/v1/organisation/person/{personId}/summary',
    handler: async (request, h) => {
      const data = organisationPersonSummary(request.params.personId)

      if (!data) {
        return Boom.notFound('Organisation summary not found')
      }

      return h.response(data)
    }
  }
]
