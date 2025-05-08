import Boom from '@hapi/boom'
import { organisationCPH, organisationCPHInfo } from '../../plugins/data/organisation-cph.js'

export const sitiAgri = [
  {
    method: 'GET',
    path: '/v1/SitiAgriApi/cph/organisation/{orgId}/cph-numbers',
    handler: async (request, h) => {
      const data = organisationCPH(request.params.orgId)

      if (!data) {
        return Boom.notFound('CPH numbers not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/SitiAgriApi/cph/organisation/{orgId}/cph-numbers/{cphNumber}',
    handler: async (request, h) => {
      const data = organisationCPHInfo(request.params.orgId, request.params.cphNumber)

      if (!data) {
        return Boom.notFound('CPH info not found')
      }

      return h.response(data)
    }
  }
]
