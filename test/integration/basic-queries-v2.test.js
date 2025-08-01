describe('Basic queries for faked routes', () => {
  let mockServer
  const PROCESS_ENV = process.env

  beforeAll(async () => {
    process.env = { ...PROCESS_ENV }
    process.env.PORT = '3097' // Set to obscure port to avoid conflicts
    const { startServer } = await import('../../src/server.js')
    mockServer = await startServer()
  })
  afterAll(() => {
    process.env = PROCESS_ENV
    mockServer.stop({ timeout: 0 })
  })

  describe('Person route', () => {
    test('Should return data /person/{personId}/summary', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/person/11111111/summary'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          id: 11111111,
          customerReferenceNumber: 'crn-11111111',
          firstName: 'Lauren',
          lastName: 'Sanford',
          email: 'lauren.sanford@immaculate-shark.info',
          address: expect.objectContaining({}) // just used to assert the `address` field name
        })
      )
    })

    test('Should return data /person/search', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/extapi/person/search',
        payload: {
          primarySearchPhrase: 'crn-11111111',
          searchFieldType: 'CUSTOMER_REFERENCE'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(1)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          fullName: 'Lauren Sanford',
          nationalInsuranceNumber: null, // available in search, not the summary!!
          id: 11111111,
          customerReference: 'crn-11111111',
          // line below is just used to assert the `primaryAddress` field name
          primaryAddress: expect.objectContaining({})
        })
      )
    })
  })

  describe('Organisation routes', () => {
    test('Should return data for /organisation/1111111111', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/organisation/1111111111'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 1111111111,
          name: 'Maggio, Murray and Dicki',
          sbi: 1111111111,
          confirmed: true,
          landline: '010952 63723',
          deactivated: false,
          locked: false
        })
      )
    })

    test('Should return data for /organisation/search', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/extapi/organisation/search',
        payload: {
          primarySearchPhrase: '1111111111',
          searchFieldType: 'SBI'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 1111111111,
          name: 'Maggio, Murray and Dicki',
          sbi: 1111111111,
          confirmed: true,
          deactivated: false,
          locked: false
        })
      )
    })
  })
})
