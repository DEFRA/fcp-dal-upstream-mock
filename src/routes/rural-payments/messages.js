import Boom from '@hapi/boom'
import { messages } from '../../plugins/data/messages.js'

export const notifications = [
  {
    method: 'GET',
    path: '/v1/notifications',
    handler: async (request, h) => {
      const { personId, page, size } = request.query

      if (!personId) {
        return Boom.badRequest('Missing personId query parameter')
      }

      const data = messages(personId, page, size)

      if (!data) {
        return Boom.notFound('Messages not found')
      }

      return h.response(data)
    }
  }
]
