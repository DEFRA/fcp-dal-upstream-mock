import Hapi from '@hapi/hapi'

import { failAction } from './common/helpers/fail-action.js'
import { createLogger } from './common/helpers/logging/logger.js'
import { requestLogger } from './common/helpers/logging/request-logger.js'
import { pulse } from './common/helpers/pulse.js'
import { requestTracing } from './common/helpers/request-tracing.js'
import { config } from './config.js'
import { router } from './plugins/router.js'

export const startServer = async () => {
  let server

  try {
    server = Hapi.server({
      host: config.get('host'),
      port: config.get('port'),
      routes: {
        validate: {
          options: { abortEarly: false },
          failAction
        },
        security: {
          hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: false
          },
          xss: 'enabled',
          noSniff: true,
          xframe: true
        }
      },
      router: { stripTrailingSlash: true }
    })

    // Hapi Plugins:
    // requestLogger  - automatically logs incoming requests
    // requestTracing - trace header logging and propagation
    // pulse          - provides shutdown handlers
    // router         - routes used in the app
    await server.register([requestLogger, requestTracing, pulse, router])
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(`Access mock on http://localhost:${config.get('port')}`)

    return server
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
    if (server) {
      await server.stop({ timeout: 0 })
    }
  }

  return server
}
