import process from 'node:process'

import { createLogger } from './common/helpers/logging/logger.js'
import { startServer } from './server.js'

const server = await startServer()

process.on('unhandledRejection', async (error) => {
  const logger = createLogger()
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
  await server.close()
})

process.on('SIGINT', async () => {
  server.logger.info('SIGINT: closing HTTP server...')
  await server.close({ timeout: 3000 })
  server.logger.info('HTTP server closed')
})
