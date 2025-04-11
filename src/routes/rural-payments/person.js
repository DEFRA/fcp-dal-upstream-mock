import Boom from '@hapi/boom'
import { personById } from '../../fixtures/person.js'
import { pagination } from '../../fixtures/pagination.js'
import { organisationPersonSummary } from '../../fixtures/organisation.js'

export const person = [
  {
    method: 'GET',
    path: '/v1/person/{personId}/summary',
    handler: async (request, h) => {
      const personId = request.params.personId
      const person = personById({ id: personId })

      if (!person) {
        return Boom.notFound('Person not found')
      }

      return h.response({ message: 'success', person })
    }
  },
  {
    method: 'POST',
    path: '/v1/person/search',
    handler: async (request, h) => {
      if (
        !request.payload?.searchFieldType ||
        !request.payload?.primarySearchPhrase
      ) {
        return Boom.badRequest('Invalid or missing search parameters')
      }

      const person = personById({
        customerReferenceNumber: request.payload.primarySearchPhrase
      })

      if (!person) {
        return Boom.notFound('Person not found')
      }

      return h.response({
        _data: [person._data],
        _page: pagination
      })
    }
  },
  {
    method: 'GET',
    path: '/v1/organisation/person/{personId}/summary',
    handler: async (request, h) => {
      const personId = request.params.personId
      const organisationSummary = organisationPersonSummary({ id: personId })

      if (!organisationSummary) {
        return Boom.notFound('Organisation summary not found')
      }

      return h.response({ message: 'success', organisationSummary })
    }
  }
]
