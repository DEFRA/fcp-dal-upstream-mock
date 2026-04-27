import { jest, expect, describe, beforeAll, afterAll, beforeEach, test } from '@jest/globals'
import Hapi from '@hapi/hapi'

const mockFetch = jest.fn()

jest.unstable_mockModule('undici', () => ({
  fetch: mockFetch,
  Agent: class {
    constructor() {}
  }
}))

const INTERNAL_URL = 'http://internal-gateway.test'
const EXTERNAL_URL = 'http://external-gateway.test'

jest.unstable_mockModule('../../../../src/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({ debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() })
}))

jest.unstable_mockModule('../../../../src/config.js', () => ({
  config: {
    get: (key) =>
      ({
        'kitsProxy.internal.gatewayUrl': INTERNAL_URL,
        'kitsProxy.external.gatewayUrl': EXTERNAL_URL,
        'kitsProxy.gatewayTimeoutMs': 5000
      })[key],
    decodedKitsMTLS: {
      internal: { cert: 'internal-cert', key: 'internal-key' },
      external: { cert: 'external-cert', key: 'external-key' }
    }
  }
}))

const mockUpstreamResponse = ({ body = {}, status = 200, headers = {} } = {}) => {
  const encoded = new TextEncoder().encode(JSON.stringify(body))
  mockFetch.mockResolvedValueOnce({
    status,
    arrayBuffer: async () => encoded.buffer,
    headers: new Headers({ 'content-type': 'application/json', ...headers })
  })
}

/**
 * This is a bit of  a hybrid test.  The proxy route is tested by starting a real Hapi server with
 * the upstream fetch mocked.  This validates routing, header filtering, and status code
 * pass-through without a live upstream.
 */
describe('KITS Proxy router', () => {
  let server

  beforeAll(async () => {
    const { router } = await import('../../../../src/routes/proxy/kits-proxy.router.js')
    server = Hapi.server()
    await server.register(router)
    await server.initialize()
  })

  afterAll(async () => {
    await server?.stop({ timeout: 0 })
  })

  beforeEach(() => {
    mockFetch.mockReset()
  })

  describe('/internal/extapi', () => {
    test('forwards GET to the internal gateway URL', async () => {
      mockUpstreamResponse({ body: { _data: { id: 123 } } })

      const response = await server.inject({
        method: 'GET',
        url: '/internal/extapi/person/123/summary'
      })

      expect(response.statusCode).toBe(200)
      expect(mockFetch).toHaveBeenCalledWith(
        `${INTERNAL_URL}/person/123/summary`,
        expect.objectContaining({ method: 'get' })
      )
    })

    test('forwards query string to upstream', async () => {
      mockUpstreamResponse({ body: { notifications: [] } })

      await server.inject({
        method: 'GET',
        url: '/internal/extapi/notifications?personId=123&organisationId=456'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `${INTERNAL_URL}/notifications?personId=123&organisationId=456`,
        expect.anything()
      )
    })

    test('forwards POST with body to upstream', async () => {
      mockUpstreamResponse({ body: { _data: [] } })

      await server.inject({
        method: 'POST',
        url: '/internal/extapi/person/search',
        headers: { 'content-type': 'application/json' },
        payload: { primarySearchPhrase: '1111111100', searchFieldType: 'CUSTOMER_REFERENCE' }
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `${INTERNAL_URL}/person/search`,
        expect.objectContaining({ method: 'post' })
      )
    })

    test('forwards on email header', async () => {
      mockUpstreamResponse()

      await server.inject({
        method: 'GET',
        url: '/internal/extapi/person/123/summary',
        headers: {
          'x-custom-header': 'keep-me',
          connection: 'close',
          'transfer-encoding': 'chunked',
          email: 'email@example.com',
          host: 'original-host'
        }
      })

      const [, { headers }] = mockFetch.mock.calls[0]
      expect(headers['email']).toBe('email@example.com')
      expect(headers['x-custom-header']).toBeUndefined()
      expect(headers['connection']).toBeUndefined()
      expect(headers['transfer-encoding']).toBeUndefined()
      expect(headers['host']).toBeUndefined()
    })

    test('returns upstream status code to caller', async () => {
      mockUpstreamResponse({ status: 404 })

      const response = await server.inject({
        method: 'GET',
        url: '/internal/extapi/person/99999/summary'
      })

      expect(response.statusCode).toBe(404)
    })

    test('returns upstream 5xx to caller', async () => {
      mockUpstreamResponse({ status: 503 })

      const response = await server.inject({
        method: 'GET',
        url: '/internal/extapi/organisation/123'
      })

      expect(response.statusCode).toBe(503)
    })
  })

  describe('/external/extapi', () => {
    test('forwards GET to the external gateway URL', async () => {
      mockUpstreamResponse({ body: { _data: { id: 123 } } })

      const response = await server.inject({
        method: 'GET',
        url: '/external/extapi/person/123/summary'
      })

      expect(response.statusCode).toBe(200)
      expect(mockFetch).toHaveBeenCalledWith(
        `${EXTERNAL_URL}/person/123/summary`,
        expect.objectContaining({ method: 'get' })
      )
    })

    test('forwards query string to upstream', async () => {
      mockUpstreamResponse()

      await server.inject({
        method: 'GET',
        url: '/external/extapi/notifications?personId=123&organisationId=456'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `${EXTERNAL_URL}/notifications?personId=123&organisationId=456`,
        expect.anything()
      )
    })

    test('returns upstream error codes to caller', async () => {
      mockUpstreamResponse({ status: 403 })

      const response = await server.inject({
        method: 'GET',
        url: '/external/extapi/person/123/summary'
      })

      expect(response.statusCode).toBe(403)
    })
  })
})
