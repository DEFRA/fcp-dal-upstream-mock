import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const loadSchema = async (schema) => {
  const fullPath = path.join(__dirname, '../', schema)

  return await SwaggerParser.dereference(fullPath)
}
