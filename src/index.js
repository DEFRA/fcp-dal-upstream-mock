import process from 'node:process'

import { createLogger } from './common/helpers/logging/logger.js'
import { startServer } from './server.js'

const server = await startServer()
const logger = createLogger()

process.on('unhandledRejection', async (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
  await server.stop()
})

process.on('SIGINT', async () => {
  logger.info('SIGINT: closing HTTP server...')
  logger.flush()
})
process.on('SIGTERM', async () => {
  logger.info('SIGTERM: closing HTTP server...')
  logger.flush()
})
