import { createServer } from 'http'
import process from 'node:process'
import { createLogger } from './common/helpers/logging/logger.js'
import { startServer } from './server.js'

const server = createServer()

server.on('clientError', (err, socket) => {
  // Override default handling of invalid characters in header to match upstream behaviour
  if ((err.code = 'HPE_INVALID_HEADER_TOKEN')) {
    const body =
      '<html><body><h1>400 Bad request</h1>Your browser sent an invalid request.</body></html>'

    const response = [
      'HTTP/1.1 400 Bad Request',
      'Content-Type: text/html',
      'Content-Length: ' + Buffer.byteLength(body),
      'Connection: close',
      'Cache-Control: no-cache',
      '',
      body
    ].join('\r\n')

    if (socket.writable) {
      socket.write(response)
      socket.destroy()
    } else {
      console.log('Socket is not writable, skipping response')
      socket.destroy()
    }
  }
})

const hapi = await startServer(server)
const logger = createLogger()

process.on('unhandledRejection', async (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
  await hapi.stop()
})

process.on('SIGINT', async () => {
  logger.info('SIGINT: closing HTTP server...')
  logger.flush()
})
process.on('SIGTERM', async () => {
  logger.info('SIGTERM: closing HTTP server...')
  logger.flush()
})
