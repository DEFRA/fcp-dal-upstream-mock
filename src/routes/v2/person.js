import Boom from '@hapi/boom'
import { crnToPersonId } from '../../factories/id-lookups.js'
import { retrievePerson } from '../../factories/person/person.factory.js'
import { pagination, pagination0 } from '../../plugins/data/pagination.js'

export const person = [
  {
    method: 'GET',
    path: '/person/{personId}/summary',
    handler: async (request, h) => {
      const personId = request.params.personId
      return h.response({ _data: retrievePerson(personId) })
    }
  },
  {
    method: 'POST',
    path: '/person/search',
    handler: async (request, h) => {
      const body = request.payload
      const crn = body?.primarySearchPhrase

      if (
        !body?.searchFieldType ||
        // Only search by CRN supported by mock
        searchFieldType !== 'CUSTOMER_REFERENCE' ||
        !crn
      ) {
        return Boom.badRequest('Invalid or missing search parameters')
      }

      let personId = crnToPersonId[crn]
      if (!personId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      return h.response({
        _data: [retrievePerson(personId)],
        _page: pagination
      })
    }
  }
]
