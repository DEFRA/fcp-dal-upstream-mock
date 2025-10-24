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

  it('should GET no land use data', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/3756/sbi/1000000000/list'
    })

    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(schema)
    expect(result.data.length).toBe(0)
  })

  it('should GET same fake generated land use data', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/3756/sbi/2222222222/list'
    })

    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(schema)
    expect(result.data.length).toBeGreaterThan(0)
    expect(result.data.every((landUse) => landUse.sbi === '2222222222')).toBe(true)
    expect(result.data[0].lu_code).toBe('QDC')
  })

  it('should return empty array when no parcel found', async () => {
    const { statusCode, result } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/NOTFOUND/sbi/1111111111/list'
    })
    expect(statusCode).toBe(200)
    expect(result.data.length).toBe(0)
  })

  it('should return empty array when no sheet found', async () => {
    const { statusCode, result } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/NOTFOUND/parcel/3756/sbi/1111111111/list'
    })
    expect(statusCode).toBe(200)
    expect(result.data.length).toBe(0)
  })

  it('should return 403 when SBI not found', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/SitiAgriApi/cv/landUseByBusinessParcel/sheet/SS6528/parcel/0000/sbi/NOTFOUND/list'
    })
    expect(statusCode).toBe(403)
  })
})
