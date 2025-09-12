import Boom from '@hapi/boom'
import { retrieveOrganisationAgreements } from '../../factories/siti-agri/agreement.factory.js'
import { retrieveApplications } from '../../factories/siti-agri/application.factory.js'
import { checkSbi } from '../../utils/shared-datatypes.js'

const responseWrapper = { errorString: null, success: true }

export const sitiagri = [
  {
    method: 'GET',
    path: '/SitiAgriApi/cv/appByBusiness/sbi/{sbi}/list',
    handler: async (request, h) => {
      const sbi = checkSbi(request)
      const applications = retrieveApplications(`${sbi}`)

      if (applications) return h.response({ ...responseWrapper, data: applications })

      throw Boom.forbidden(`organisation with SBI: ${sbi} not found`, request) // YES, 404 is a 403!!
    }
  },
  {
    method: 'GET',
    path: '/SitiAgriApi/cv/agreementsByBusiness/sbi/{sbi}/list',
    handler: async (request, h) => {
      const sbi = checkSbi(request)

      return h.response({
        data: retrieveOrganisationAgreements(sbi),
        success: true,
        errorString: null
      })
    }
  }
]
