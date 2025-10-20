import Hapi from '@hapi/hapi'
import { sitiagri } from '../../../src/routes/siti-agri.js'
import { loadSchema } from '../../../src/utils/validatePayload.js'

describe('Fake Land Use data', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(sitiagri)
    await Promise.all([
      server.initialize(),
      loadSchema('/routes/siti-agri-schema.oas.yml').then(
        (s) =>
          (schema =
            s.paths[
              '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/{sheet}/parcel/{parcel}/sbi/{sbi}/list'
            ].get.responses['200'].content['application/json'].schema)
      )
    ])
  })

  it('should GET fake Land Use data conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/3756/sbi/2222222222/list'
    })

    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(schema)
    expect(result.data.every((landUse) => landUse.sbi === '2222222222')).toBe(true)
  })

  it('should GET Land Use data with overrides defined in the id-lookups', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/3756/sbi/1111111111/list'
    })

    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(schema)
    expect(result.data.every((landUse) => landUse.sbi === '1111111111')).toBe(true)
    expect(result.data.every((landUse) => landUse.lu_code === 'WO25')).toBe(true)
  })
})
