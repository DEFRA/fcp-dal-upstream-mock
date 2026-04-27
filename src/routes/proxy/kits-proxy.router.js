import { fetch as fetch11, Agent } from 'undici'
import { config } from '../../config.js'
import tls from 'node:tls'

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

// Certain headers should not be forwarded, when proxying (these headers are specific to this `hop`
// in the request chain.  Ensure we don't forward them on.
// TODO Might be safer coming the other way... What headers, if any, SHOULD be forwarded on?
const filerOutHopByHopHeaders = (headers) =>
  Object.fromEntries(
    Object.entries(headers).filter(([key]) => !HOP_BY_HOP_HEADERS_FOR_EXCLUSION.has(key))
  )

const mtlsDispatcher = (mtlsConfig, baseUrl) => {
  const kitsUrl = new URL(baseUrl)
  const requestTls = {
    host: kitsUrl.hostname,
    port: kitsUrl.port,
    servername: kitsUrl.hostname
  }
  if (mtlsConfig.ca) {
    requestTls.secureContext = tls.createSecureContext(mtlsConfig)
  } else {
  }

  return new Agent({
    connect: {
      ca: mtlsConfig.ca || undefined,
      cert: mtlsConfig.cert || undefined,
      key: mtlsConfig.key || undefined
    }
  })
}

const proxyRoute = (routePath, baseUrl, mtlsConfig) => ({
  method: '*',
  path: routePath,
  options: {
    auth: false,
    payload: { output: 'data', parse: false }
  },
  handler: async (request, h) => {
    const forwardedPath = request.params.path ?? ''
    const targetUrl = `${baseUrl}/${forwardedPath}${request.url.search}`

    const upstreamResponse = await fetch11(targetUrl, {
      method: request.method,
      headers: filerOutHopByHopHeaders(request.headers),
      body: request.payload ?? undefined,
      dispatcher: mtlsDispatcher(mtlsConfig, baseUrl),
      signal: AbortSignal.timeout(config.get('kitsProxy.gatewayTimeoutMs'))
    })

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
})

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
