import Hapi from '@hapi/hapi'
import inert from '@hapi/inert'

import { failAction } from './common/helpers/fail-action.js'
import { createLogger } from './common/helpers/logging/logger.js'
import { requestLogger } from './common/helpers/logging/request-logger.js'
import { pulse } from './common/helpers/pulse.js'
import { requestTracing } from './common/helpers/request-tracing.js'
import { config } from './config.js'
import { router as fakeRouter } from './plugins/fake-router.js'
import { router } from './plugins/router.js'
import { schemata } from './routes/schemata.js'

const logger = createLogger()
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
    // inert          - serves static files
    // schemata       - serves swagger 2.0 schema files
    // router         - routes used in the app
    await server.register([requestLogger, requestTracing, pulse, inert, schemata, router])
    await server.register(fakeRouter, {
      routes: {
        prefix: '/extapi'
      }
    })

    // emulate upstream error responses
    server.ext('onPreResponse', (request, h) => {
      const response = request.response

      if (response.isBoom) {
        const code = response.output.statusCode
        logger.warn({
          http: {
            request: {
              id: request.info.id,
              method: request.method,
              ...(request?.headers && { headers: request.headers })
            },
            response: {
              status_code: code,
              ...(request?.info?.received && {
                response_time: new Date().getTime() - request.info.received
              })
            }
          },
          error: {
            code,
            type: response.name,
            message: response.message,
            stack_trace: response.stack
          },
          message: `${request.method}${
            request.payload ? ' ' + JSON.stringify(request.payload) : ''
          } ${request.path} ${code}`
        })

        // Replace payload for client
        if (code === 403) {
          return h
            .response(`<html><body><h1>403 Forbidden</h1>\n${response.message}\n</body></html>\n`)
            .code(code)
        }
        return h.response({ code, message: response.message }).code(code)
      }

      return h.continue
    })

    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(`Access mock on http://localhost:${config.get('port')}`)

    return server
  } catch (error) {
    logger.info('Server failed to start :(')
    logger.error(error)
    if (server) {
      await server.stop({ timeout: 0 })
    }
  }

  return server
}
