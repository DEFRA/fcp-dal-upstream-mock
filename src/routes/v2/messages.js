import Boom from '@hapi/boom'
import { retrieveMessages } from '../../factories/messages.factory.js'

export const notifications = [
  {
    method: 'GET',
    path: '/notifications',
    handler: async (request, h) => {
      const { personId, organisationId } = request.query

      if (!personId) {
        return Boom.badRequest('Missing personId query parameter')
      }
      if (!organisationId) {
        return Boom.badRequest('Missing organisationId query parameter')
      }

      const data = retrieveMessages(parseInt(organisationId), parseInt(personId))

      return h.response(data)
    }
  }
]
