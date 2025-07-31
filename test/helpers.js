import path from 'path'
import SwaggerParser from 'swagger-parser'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const loadSchema = async (schema) => {
  const fullPath = path.join(__dirname, '../', schema)

  return await SwaggerParser.dereference(fullPath)
}
