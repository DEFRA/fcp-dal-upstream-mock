import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv({ strict: false })
addFormats(ajv)

expect.extend({
  toConformToSchema(received, schema) {
    const validate = ajv.compile(schema)

    if (validate(received)) {
      return {
        pass: true,
        message: () => 'expected object not to conform to schema'
      }
    }

    return {
      pass: false,
      message: () =>
        `expected object to conform to schema but got errors:\n` +
        JSON.stringify(validate.errors, null, 2)
    }
  }
})
