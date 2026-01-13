import { jest } from '@jest/globals'

describe('createListener with TLS', () => {
  const PROCESS_ENV = process.env

  beforeAll(() => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '3098'
    process.env.TLS_KEY = Buffer.from('key').toString('base64')
    process.env.TLS_CERT = Buffer.from('cert').toString('base64')
    process.env.TLS_CA = Buffer.from('ca').toString('base64')
  })

  afterAll(() => {
    process.env = PROCESS_ENV
  })

  test('Creates an HTTPS server and enables mTLS', async () => {
    let capturedOpts = null
    jest.unstable_mockModule('https', () => ({
      createServer: (opts) => {
        capturedOpts = opts
        return { on: jest.fn(), listen: jest.fn() }
      }
    }))

    const idx = await import('../../src/index.js')
    idx.createListener()

    expect(capturedOpts).toEqual(
      expect.objectContaining({
        key: 'key',
        cert: 'cert',
        ca: 'ca',
        requestCert: true,
        rejectUnauthorized: true
      })
    )
  })
})
