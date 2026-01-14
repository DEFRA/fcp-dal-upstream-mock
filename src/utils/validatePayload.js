import SwaggerParser from '@apidevtools/swagger-parser'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function loadSchema(schema) {
  const fullPath = path.join(__dirname, '../', schema)

  return await SwaggerParser.dereference(fullPath)
}

export const ajv = new Ajv({ strict: false })
addFormats(ajv) // add common formats like 'date-time', 'email' etc.

// register a custom "foreign-key" format validator
ajv.addFormat('foreign-key', {
  type: 'number',
  validate: (id) => Number.isInteger(id) && id > 0
})

export async function createPayloadValidator(schemaPath, path) {
  const schema = path(await loadSchema(schemaPath))
  const validate = ajv.compile(schema)

  return validate
}
