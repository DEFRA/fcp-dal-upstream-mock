import Boom from '@hapi/boom'
import { retrieveOrganisationAgreements } from '../../factories/siti-agri/agreement.factory.js'

export const sitiagri = [
  {
    method: 'GET',
    path: '/SitiAgriApi/cv/agreementsByBusiness/sbi/{sbi}/list',
    handler: async (request, h) => {
      const sbi = parseInt(request.params.sbi, 10)

      if (isNaN(sbi) || sbi < 0 || `${sbi}`.length > 20) {
        throw Boom.forbidden('Request forbidden by administrative rules.', request)
      }

      return h.response({
        data: retrieveOrganisationAgreements(sbi),
        success: true,
        errorString: null
      })
    }
  }
]
