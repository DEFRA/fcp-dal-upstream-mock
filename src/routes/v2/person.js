import Boom from '@hapi/boom'
import { crnIdCache } from '../../../fixtures/relations/crn-person-id.js'
import { createPerson } from '../../factories/person/person.factory.js'
import { pagination, pagination0 } from '../../plugins/data/pagination.js'

const idCrnCache = Object.fromEntries(Object.entries(crnIdCache).map(([crn, id]) => [id, crn]))

export const person = [
  {
    method: 'GET',
    path: '/v2/person/{personId}/summary',
    handler: async (request, h) => {
      const crn = idCrnCache[request.params.personId]

      if (crn) {
        return h.response({ _data: createPerson(parseInt(request.params.personId), crn) })
      }

      return Boom.notFound('Person not found')
    }
  },
  {
    method: 'POST',
    path: '/v2/person/search',
    handler: async (request, h) => {
      const body = request.payload

      if (!body?.searchFieldType || !body?.primarySearchPhrase) {
        return Boom.badRequest('Invalid or missing search parameters')
      }

      let personId = crnIdCache[body.primarySearchPhrase]
      if (!personId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      return h.response({
        _data: [createPerson(personId, body.primarySearchPhrase)],
        _page: pagination
      })
    }
  }
]
