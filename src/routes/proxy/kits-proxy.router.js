import { fetch as fetch11, Agent } from 'undici'
import { config } from '../../config.js'
import { createLogger } from '../../common/helpers/logging/logger.js'
import { he } from '@faker-js/faker'

const logger = createLogger()

const HOP_BY_HOP_HEADERS_FOR_EXCLUSION = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host'
])

const ALLOWED_HEADERS = new Set(['email'])

// Certain headers should not be forwarded, when proxying (these headers are specific to this `hop`
// in the request chain.  Ensure we don't forward them on.
// TODO Might be safer coming the other way... What headers, if any, SHOULD be forwarded on?
const filerOutHopByHopHeaders = (headers) => {
  logger.info(`Pre filter headers: ${JSON.stringify(headers)}`)
  const h = Object.fromEntries(
    Object.entries(headers).filter(([key]) => !HOP_BY_HOP_HEADERS_FOR_EXCLUSION.has(key))
  )
  logger.info(`Post filter headers: ${JSON.stringify(h)}`)
  return h
}

const extractHeaders = (headers) => {
  logger.info(`Pre filter headers: ${JSON.stringify(headers)}`)
  const h = Object.fromEntries(
    Object.entries(headers).filter(([key]) => ALLOWED_HEADERS.has(key.toLowerCase()))
  )
  logger.info(`Post filter headers: ${JSON.stringify(h)}`)
  return h
}

const peek = (str) => (str ? `${str.slice(0, 25)}...${str.slice(-10)}` : 'undefined')

const mtlsDispatcher = (mtlsConfig, baseUrl) => {
  const { hostname } = new URL(baseUrl)
  logger.info(
    `mTLS dispatcher config : ${JSON.stringify({ cert: peek(mtlsConfig.cert), key: peek(mtlsConfig.key), ca: peek(mtlsConfig.ca), hostname })}`
  )
  return new Agent({
    connect: {
      ...(mtlsConfig.ca && { ca: mtlsConfig.ca }),
      cert: mtlsConfig.cert,
      key: mtlsConfig.key,
      servername: hostname
    }
  })
}

const proxyRoute = (routePath, baseUrl, mtlsConfig) => {
  if (!mtlsConfig.cert || !mtlsConfig.key) {
    throw new Error(`mTLS cert/key not configured for route ${routePath}`)
  }
  const dispatcher = mtlsDispatcher(mtlsConfig, baseUrl)

  return {
    method: '*',
    path: routePath,
    options: {
      auth: false,
      payload: { output: 'data', parse: false }
    },
    handler: async (request, h) => {
      const forwardedPath = request.params.path ?? ''
      const targetUrl = `${baseUrl}/${forwardedPath}${request.url.search}`

      logger.info(`Proxying ${request.method.toUpperCase()} ${targetUrl}`)
      let upstreamResponse
      try {
        upstreamResponse = await fetch11(targetUrl, {
          method: request.method,
          headers: extractHeaders(request.headers),
          body: request.payload ?? undefined,
          dispatcher,
          signal: AbortSignal.timeout(config.get('kitsProxy.gatewayTimeoutMs'))
        })
      } catch (err) {
        logger.error(
          { err, cause: err.cause, targetUrl, method: request.method.toUpperCase() },
          'upstream fetch failed'
        )
        throw err
      }

      const responseBody = await upstreamResponse.arrayBuffer()
      const responseHeaders = filerOutHopByHopHeaders(
        Object.fromEntries(upstreamResponse.headers.entries())
      )

      const response = h.response(Buffer.from(responseBody)).code(upstreamResponse.status)
      for (const [name, value] of Object.entries(responseHeaders)) {
        response.header(name, value)
      }
      return response
    }
  }
}

export const router = {
  plugin: {
    name: 'kits-proxy-router',
    register: (server, _) => {
      server.route([
        proxyRoute(
          '/internal/extapi/{path*}',
          config.get('kitsProxy.internal.gatewayUrl'),
          config.decodedKitsMTLS.internal
        ),
        proxyRoute(
          '/external/extapi/{path*}',
          config.get('kitsProxy.external.gatewayUrl'),
          config.decodedKitsMTLS.external
        )
      ])
    }
  }
}
