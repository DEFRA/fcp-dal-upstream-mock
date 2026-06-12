import Hapi from '@hapi/hapi'
import { referenceData } from '../../../../src/routes/kits-v1/reference-data.js'
import { loadSchema } from '../../../../src/utils/validatePayload.js'

describe('Reference Data routes', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(referenceData)
    await Promise.all([
      server.initialize(),
      loadSchema('/routes/kits-v1/reference-data-schema.oas.yml').then((s) => (schema = s))
    ])
  })

  it('should GET reference data conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/reference/legalstatus'
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/reference/legalstatus'].get.responses['200'].content['application/json'].schema
    )
  })
})
