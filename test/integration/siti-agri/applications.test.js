import Hapi from '@hapi/hapi'
import { sitiagri } from '../../../src/routes/v2/siti-agri.js'
import { loadSchema } from '../../helpers.js'

describe('Fake Authenticate data', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(sitiagri)
    await Promise.all([
      server.initialize(),
      loadSchema('src/routes/v2/siti-agri-schema.oas.yml').then((s) => (schema = s))
    ])
  })

  it('should GET applications data conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/appByBusiness/sbi/1111111111/list'
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/SitiAgriApi/cv/appByBusiness/sbi/{sbi}/list'].get.responses['200'].content[
        'application/json'
      ].schema
    )
  })
})
