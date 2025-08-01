import Hapi from '@hapi/hapi'
import { authenticate } from '../../../../src/routes/v2/authenticate-data.js'
import { loadSchema } from '../../../helpers.js'

describe('Fake Authenticate data', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(authenticate)
    await Promise.all([
      server.initialize(),
      loadSchema('src/routes/v2/authenticate-schema.yml').then((s) => (schema = s))
    ])
  })

  it('should return 204 if person found with no authenticate data set', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/external-auth/security-answers/crn-11111111'
    })
    expect(statusCode).toBe(204)
  })

  it('should GET authenticate data conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/external-auth/security-answers/crn-11111112'
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/external-auth/security-answers/{crn}'].get.responses['200'].schema
    )
  })
})
