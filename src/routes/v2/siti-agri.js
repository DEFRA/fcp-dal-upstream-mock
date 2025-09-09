import Boom from '@hapi/boom'
import { createLogger } from '../../common/helpers/logging/logger.js'
import { sbiToOrgId } from '../../factories/id-lookups.js'
import { retrieveApplications } from '../../factories/siti-agri/application.factory.js'
import { retrieveCPHs } from '../../factories/siti-agri/cph.factory.js'

const logger = createLogger('siti-agri.route')
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
  },
  {
    method: 'GET',
    path: '/SitiAgriApi/cv/cphByBusiness/sbi/{sbi}/list',
    handler: async (request, h) => {
      const sbi = request.params.sbi
      const orgId = sbiToOrgId[sbi]
      if (!orgId) {
        return Boom.forbidden(`organisation with SBI: ${sbi} not found`, request) // 404 is a 403!!
      }

      // specifically handle uniquely odd `pointInTime` format requirements and error response
      if (!/^(\d{4}-\d{2}-\d{2}[ +]\d{2}:\d{2}:\d{2}|)$/.test(request.query.pointInTime ?? '')) {
        logger.warn(
          'pointInTime value must be empty, omitted, or match pattern: "YYYY-MM-DD hh:mm:ss"',
          request
        )
        return h
          .response(
            `<!doctype html><html lang="en"><head><title>HTTP Status 404 – Not Found</title></head>
            <body><h1>HTTP Status 404 – Not Found</h1></body></html>`
          )
          .code(404)
      }

      return h.response({ data: retrieveCPHs(sbi, orgId), errorString: null, success: true })
    }
  }
]
