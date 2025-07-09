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
          title: 'Mr.',
          firstName: 'Gerhard',
          middleName: 'Shayna',
          lastName: 'Purdy',
          dateOfBirth: '1955-10-30',
          landline: '055 2317 9411',
          mobile: '01650 95852',
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          id: 11111111,
          customerReferenceNumber: 'crn-11111111'
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
          fullName: 'Gerhard Purdy',
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          id: 11111111,
          customerReference: 'crn-11111111'
        })
      )
    })
  })

  describe('Organisation routes', () => {
    test('Should return data for /organisation/11111111', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/organisation/11111111'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 11111111,
          name: 'Stamm LLC',
          sbi: 'sbi-11111111',
          confirmed: false,
          landline: '0800 977814',
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
          primarySearchPhrase: 'sbi-11111111',
          searchFieldType: 'SBI'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 11111111,
          name: 'Stamm LLC',
          sbi: 'sbi-11111111',
          confirmed: false,
          landline: '0800 977814',
          deactivated: false,
          locked: false
        })
      )
    })
  })
})
