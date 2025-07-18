import hapi from '@hapi/hapi'
import { expect, jest } from '@jest/globals'

const mockHapiLoggerInfo = jest.fn()
const mockHapiLoggerError = jest.fn()

jest.mock('hapi-pino', () => ({
  register: (server) => {
    server.decorate('server', 'logger', {
      info: mockHapiLoggerInfo,
      error: mockHapiLoggerError
    })
  },
  name: 'mock-hapi-pino'
}))

describe('#startServer', () => {
  const PROCESS_ENV = process.env
  let hapiServerSpy = jest.fn()
  let startServerImport

  beforeAll(async () => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '3098' // Set to obscure port to avoid conflicts

    startServerImport = await import('../../src/server.js')
  })

  afterAll(() => {
    process.env = PROCESS_ENV
  })

  describe('When server starts', () => {
    let server

    afterAll(async () => {
      if (server) await server.stop({ timeout: 0 })
    })

    test('Should start up server on specified port', async () => {
      hapiServerSpy = jest.spyOn(hapi, 'server')
      server = await startServerImport.startServer()

      expect(hapiServerSpy).toHaveBeenCalledWith(expect.objectContaining({ port: 3098 }))
      expect(mockHapiLoggerInfo).toHaveBeenNthCalledWith(1, 'Server started successfully')
      expect(mockHapiLoggerInfo).toHaveBeenNthCalledWith(2, 'Access mock on http://localhost:3098')
    })
  })

  describe('When server start fails', () => {
    test('Should attempt to stop (teardown) the server', async () => {
      const register = jest.fn()
      const ext = jest.fn()
      const start = jest.fn(() => {
        throw new Error('Server failed to start')
      })
      const stop = jest.fn()
      hapiServerSpy.mockReturnValue({ register, ext, start, stop })
      await startServerImport.startServer()

      expect(register).toHaveBeenCalled()
      expect(ext).toHaveBeenCalled()
      expect(start).toHaveBeenCalled()
      expect(stop).toHaveBeenCalledWith({ timeout: 0 })
    })
  })
})
