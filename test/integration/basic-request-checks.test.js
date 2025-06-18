describe('Check basic requests', () => {
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

  test('Should return 200 /health', async () => {
    const response = await mockServer.inject({
      method: 'GET',
      url: '/health'
    })
    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual('{"message":"success"}')
  })

  describe('Authentication route', () => {
    test('Should return data /v1/external-auth/security-answers/4705658987', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/external-auth/security-answers/4705658987'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        memorableDate: '11/11/2000',
        memorableEvent: 'Birthday',
        memorableLocation: 'location',
        lastUpdatedOn: '2025-02-10T09:21:24.285'
      })
    })
  })

  describe('Person route', () => {
    test('Should return data /v1/person/{personId}/summary', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/person/5043447/summary'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          title: 'Mr.',
          firstName: 'Julia',
          middleName: 'Bob',
          lastName: 'Theobald',
          dateOfBirth: '1994-01-24T02:37:34.730Z',
          mobile: '0887090618',
          email: 'Jude.Renner90@hotmail.com',
          id: 5043447,
          customerReferenceNumber: '9405965470'
        })
      )
    })

    test('Should return data /v1/person/search', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/v1/person/search',
        payload: {
          primarySearchPhrase: '9405965470',
          searchFieldType: 'anything'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(1)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          title: 'Mr.',
          firstName: 'Julia',
          middleName: 'Bob',
          lastName: 'Theobald',
          dateOfBirth: '1994-01-24T02:37:34.730Z',
          mobile: '0887090618',
          email: 'Jude.Renner90@hotmail.com',
          id: 5043447,
          customerReferenceNumber: '9405965470'
        })
      )
    })

    test('Should return data /v1/organisation/person/{personId}/summary', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/organisation/person/5007136/summary'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual([
        {
          additionalSbiIds: [],
          confirmed: true,
          deactivated: false,
          id: '5625145',
          landConfirmed: null,
          lastUpdatedOn: null,
          locked: false,
          name: 'Cliff Spence T/As Abbey Farm',
          readNotificationCount: 0,
          sbi: 107591843,
          unreadNotificationCount: 3
        }
      ])
    })
  })

  describe('Organisation routes', () => {
    test('Should return data for /v1/organisation/5565448', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/organisation/5565448'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 5565448,
          name: 'HENLEY, RE',
          sbi: 107183280,
          additionalSbiIds: [105179439],
          confirmed: true,
          lastUpdatedOn: 1689694700448,
          landConfirmed: true,
          deactivated: false,
          locked: false
        })
      )
    })

    test('Should return data for /v1/organisation/search', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/v1/organisation/search',
        payload: {
          primarySearchPhrase: '107183280',
          searchFieldType: 'anything'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 5565448,
          name: 'HENLEY, RE',
          sbi: 107183280,
          additionalSbiIds: [105179439],
          confirmed: true,
          lastUpdatedOn: 1689694700448,
          landConfirmed: true,
          deactivated: false,
          locked: false
        })
      )
    })

    test('Should return data for /v1/authorisation/organisation/5565448', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/authorisation/organisation/5565448'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(6)
      expect(json._data).toContainEqual({
        confirmed: false,
        customerReference: '1638563942',
        firstName: 'Nicholas',
        id: 5263421,
        lastName: 'SANGSTER',
        lastUpdatedOn: 1614108764000,
        privileges: [
          'Full permission - business',
          'Amend - land',
          'Amend - entitlement',
          'Submit - bps',
          'SUBMIT - BPS - SA',
          'AMEND - ENTITLEMENT - SA',
          'AMEND - LAND - SA'
        ],
        role: 'Business Partner'
      })
    })
  })

  describe('Messages route', () => {
    test('Should return data /v1/notifications?personId=5043447&size=5', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/notifications?personId=5043447&size=5'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(Object.keys(json)).toEqual([
        'notifications',
        'resultCount',
        'readCount',
        'unreadCount'
      ])
      expect(json).toEqual(
        expect.objectContaining({ resultCount: 4, readCount: 2, unreadCount: 2 })
      )
      expect(json.notifications).toHaveLength(4)
      expect(json.notifications).toContainEqual({
        id: 4509457,
        personId: 5043447,
        organisationId: '5625145',
        messageId: 9498541,
        readAt: 3000,
        archivedAt: null,
        archive: null,
        createdAt: 3494617373808,
        title: 'Permission changed for Julia Theobald',
        body: '<p>Your permission for Julia Theobald was changed on Sun Dec 04 2022</p>',
        category: 'OrganisationLevel',
        bespokeNotificationId: null
      })
    })
  })

  describe('LMS routes - beginning: /v1/lms/organisation/{orgId}', () => {
    const orgPath = '/v1/lms/organisation/5565448'
    test('Should return data for /land-covers', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/land-covers`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toHaveLength(254)
      expect(Object.keys(json[0])).toEqual(['id', 'info'])
      expect(json[0]).toHaveProperty('id', 'SS68294510')
      expect(json[0]).toHaveProperty(
        'info',
        expect.arrayContaining([{ area: 0, code: '110', name: 'Arable Land' }])
      )
    })

    test('Should return data for /parcels', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/parcels`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toHaveLength(302)
      expect(json).toContainEqual({
        area: 7316.47,
        id: 6767558,
        parcelId: '9737',
        pendingDigitisation: false,
        sheetId: 'SS6629'
      })
    })

    test('Should return data for /parcels/historic/01-Jan-22', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/parcels/historic/01-Jan-22`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toHaveLength(302)
      expect(json).toContainEqual({
        area: 7316.47,
        id: 6767558,
        parcelId: '9737',
        pendingDigitisation: false,
        sheetId: 'SS6629'
      })
    })

    test('Should return data for /covers-summary/historic/01-Jan-2020', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/covers-summary/historic/01-Jan-20`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toHaveLength(3)
      expect(json).toContainEqual({ area: 2282947.36, code: '110', name: 'Arable Land' })
    })

    test('Should return data for /geometries', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/geometries?bbox=0&historicDate=01012020`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(Object.keys(json)).toEqual(['type', 'features'])
      expect(json.type).toEqual('FeatureCollection')
      expect(json.features).toHaveLength(323)
      expect(json.features[0]).toEqual({
        id: 7386349,
        geometry: {
          coordinates: [expect.arrayContaining([[269971.7467, 127999.233]])],
          type: 'Polygon'
        },
        properties: {
          area: '62316.36',
          parcelId: '8194',
          pendingDigitisation: 'false',
          sheetId: 'SS6927'
        },
        type: 'Feature'
      })
    })

    test('Should return data for /parcel/sheet-id/SS6728/parcel-id/2463/historic/01-Jan-22/land-covers', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/parcel/sheet-id/SS6728/parcel-id/2463/historic/01-Jan-22/land-covers`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(Object.keys(json)).toEqual(['type', 'features'])
      expect(json.type).toEqual('FeatureCollection')
      expect(json.features).toHaveLength(3)
      expect(json.features).toContainEqual({
        geometry: null,
        id: '110',
        properties: { area: '0', code: '110', isBpsEligible: true, name: 'Arable Land' },
        type: 'Feature'
      })
    })

    test('Should return data for /parcel-details/historic/01-Jan-22', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `${orgPath}/parcel-details/historic/01-Jan-22`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toHaveLength(302)
      expect(json).toContainEqual({
        parcelId: '9737',
        sheetId: 'SS6629',
        validFrom: 1636934401682,
        validTo: 1636934392140
      })
    })
  })

  describe('SitiAgri routes - beginning: /v1/SitiAgriApi/cph/organisation/{orgId}', () => {
    test('Should return data /cph-numbers', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/v1/SitiAgriApi/cph/organisation/5565448/cph-numbers'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            { cphNumber: '10/327/0023', parcelNumbers: ['SS6927 1650'] }
          ]),
          errorString: null,
          success: true
        })
      )
    })

    test('Should return data /cph-numbers/{cphNumber}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `/v1/SitiAgriApi/cph/organisation/5565448/cph-numbers/${encodeURIComponent('10/327/0023')}`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        data: {
          cphNumber: '10/327/0023',
          parish: 'FILLEIGH',
          startDate: 1381359600000,
          expiryDate: 1456876800000,
          species: ['OTHER'],
          xCoordinate: 267000.0,
          yCoordinate: 128000.0
        },
        errorString: null,
        success: true
      })
    })
  })
})
