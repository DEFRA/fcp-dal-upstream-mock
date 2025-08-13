import Boom from '@hapi/boom'
import { retrieveApplications } from '../../factories/siti-agri/application.factory.js'

const responseWrapper = { errorString: null, success: true }

export const sitiagri = [
  {
    method: 'GET',
    path: '/SitiAgriApi/cv/appByBusiness/sbi/{sbi}/list',
    handler: async (request, h) => {
      const sbi = request.params.sbi
      const applications = retrieveApplications(sbi)

      if (applications) return h.response({ ...responseWrapper, data: applications })

      throw Boom.forbidden(`organisation with SBI: ${sbi} not found`, request) // YES, 404 is a 403!!
    }
  }
]
