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

    // try to retrieve the value at the instance path for each error to make debugging easier
    validate.errors.forEach((error) => {
      try {
        let value = received
        error.instancePath
          .split('/')
          .slice(1)
          .forEach((segment) => {
            value = value[segment]
          })
        error.value = value
      } catch (e) {
        error.value = 'could not retrieve value at instance path: ' + e.message
      }
    })

    return {
      pass: false,
      message: () =>
        `expected object to conform to schema but got errors:\n` +
        JSON.stringify(validate.errors, null, 2)
    }
  }
})
