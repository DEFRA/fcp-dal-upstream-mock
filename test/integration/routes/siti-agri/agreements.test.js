import { retrieveOrganisationAgreements } from '../../../../src/factories/siti-agri/agreement.factory.js'

describe('Basic queries for faked routes', () => {
  let mockServer
  const PROCESS_ENV = process.env

  beforeAll(async () => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '3097' // Set to obscure port to avoid conflicts
    const { startServer } = await import('../../../../src/server.js')
    mockServer = await startServer()
  })
  afterAll(() => {
    process.env = PROCESS_ENV
    mockServer.stop({ timeout: 0 })
  })

  describe('SitiAgri route', () => {
    test('Should return data for /SitiAgriApi/cv/agreementsByBusiness/sbi/1111111111/list', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `/extapi/SitiAgriApi/cv/agreementsByBusiness/sbi/1111111111/list`
      })

      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)

      const agreements = retrieveOrganisationAgreements(1111111111)
      expect(json.data).toEqual(agreements)
    })
  })
})
