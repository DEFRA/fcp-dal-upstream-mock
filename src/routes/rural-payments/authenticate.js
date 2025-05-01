import { authenticateAnswers } from '../../plugins/data/authenticate.js'

export const authenticate = [
  {
    method: 'GET',
    path: '/v1/external-auth/security-answers/{crn}',
    handler: async (request, h) => {
      const data = authenticateAnswers(request.params.crn)

      if (!data) {
        return h.response().code(204)
      }

      return h.response(data)
    }
  }
]
