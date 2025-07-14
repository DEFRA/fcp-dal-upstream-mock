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

      // Only search by CRN supported by mock
      // mimic the actual upstream responses...
      if (body?.searchFieldType !== 'CUSTOMER_REFERENCE') {
        throw Boom.internal(
          'There was an error processing your request. It has been logged (ID someID)'
        )
      }
      if ((crn?.length || 0) < 9) {
        throw Boom.badRequest('HTTP 400 Bad Request')
      }
      let personId = crnToPersonId[crn]
      if (!personId) {
        return h.response({ _data: [], _page: pagination0 })
      }

      const {
        id,
        firstName,
        lastName,
        primaryAddress,
        personalIdentifiers,
        nationalInsuranceNumber,
        customerReferenceNumber,
        email,
        locked,
        deactivated
      } = retrievePerson(personId)
      return h.response({
        _data: [
          {
            // NOTE: the limited schema for search results
            id,
            fullName: `${firstName} ${lastName}`,
            primaryAddress,
            personalIdentifiers,
            nationalInsuranceNumber,
            customerReference: customerReferenceNumber,
            email,
            locked,
            deactivated
          }
        ],
        _page: pagination
      })
    }
  }
]
