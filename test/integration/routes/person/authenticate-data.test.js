import Hapi from '@hapi/hapi'
import { authenticate } from '../../../../src/routes/authenticate-data.js'
import { loadSchema } from '../../../../src/utils/validatePayload.js'

describe('Fake Authenticate data', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(authenticate)
    await Promise.all([
      server.initialize(),
      loadSchema('/routes/authenticate-schema.oas.yml').then((s) => (schema = s))
    ])
  })

  it('should return 204 if person found with no authenticate data set', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/external-auth/security-answers/1111111100'
    })
    expect(statusCode).toBe(204)
  })

  it('should GET authenticate data conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/external-auth/security-answers/1111111200'
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/external-auth/security-answers/{crn}'].get.responses['200'].content[
        'application/json'
      ].schema
    )
  })
})
