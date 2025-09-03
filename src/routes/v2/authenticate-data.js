import Boom from '@hapi/boom'
import { retrieveAuthenticateData } from '../../factories/person/authenticate-data.factory.js'

export const authenticate = [
  {
    method: 'GET',
    path: '/external-auth/security-answers/{crn}',
    handler: async (request, h) => {
      const crn = request.params.crn

      // Validate the CRN format
      if (!/\d{10,20}/.test(crn)) {
        throw Boom.forbidden(`bad CRN: ${crn}, is not an integer in the acceptable range`, request)
      }

      // handle valid request
      const authenticateData = retrieveAuthenticateData(crn)
      if (!authenticateData) {
        return h.response().code(204) // when the answers have not yet been set
      }
      return h.response(authenticateData) // happy response with data
    }
  }
]
