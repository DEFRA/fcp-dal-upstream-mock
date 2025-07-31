import Ajv from 'ajv'

const ajv = new Ajv({ strict: false }) // or use ajv-draft-04 if needed

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
