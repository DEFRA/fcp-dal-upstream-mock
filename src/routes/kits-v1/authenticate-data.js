import Boom from '@hapi/boom'
import {
  retrieveAuthenticateData,
  saveAuthenticateData
} from '../../factories/person/authenticate-data.factory.js'
import { checkId } from '../../utils/shared-datatypes.js'
import { createPayloadValidator } from '../../utils/validatePayload.js'

const validateSecurityAnswersPayload = await createPayloadValidator(
  'routes/kits-v1/authenticate-schema.oas.yml',
  (schema) =>
    schema.paths['/external-auth/security-answers/{crn}'].post.requestBody.content[
      'application/json'
    ].schema
)

export const authenticate = [
  {
    method: 'GET',
    path: '/external-auth/security-answers/{crn}',
    handler: async (request, h) => {
      const crn = request.params.crn

      // Validate the CRN format
      checkId(request, 'crn')

      // handle valid request
      const authenticateData = retrieveAuthenticateData(crn)
      if (!authenticateData) {
        return h.response().code(204) // when the answers have not yet been set
      }
      return h.response(authenticateData) // happy response with data
    }
  },
  {
    method: 'POST',
    path: '/external-auth/security-answers/{crn}',
    handler: async (request, h) => {
      const crn = checkId(request, 'crn')

      if (!validateSecurityAnswersPayload(request.payload)) {
        throw Boom.badRequest('validation error while processing input', request)
      }

      // Upstream returns 404 for an unknown CRN, and saves any omitted answers as null
      saveAuthenticateData(crn, request.payload)
      return h.response().code(200)
    }
  }
]
