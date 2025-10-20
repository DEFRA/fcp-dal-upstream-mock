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

  describe('Land routes', () => {
    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual(
        expect.arrayContaining([
          {
            area: 3429.03,
            id: 6919136,
            parcelId: '3649',
            pendingDigitisation: true,
            sheetId: 'SS6830'
          },
          {
            area: 4269.22,
            id: 6772251,
            parcelId: '4244',
            pendingDigitisation: false,
            sheetId: 'SS6629'
          }
        ])
      )
    })

    test('Should return data for /lms/organisation/{organisationId}/parcel-details/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel-details/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual(
        expect.arrayContaining([
          { parcelId: '3649', sheetId: 'SS6830', validFrom: 1717315321902, validTo: 1717488121902 },
          { parcelId: '4244', sheetId: 'SS6629', validFrom: 1724562694258, validTo: 1724821894258 }
        ])
      )
    })

    test('Should return data for /lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6829/parcel-id/0448/historic/01-Mar-25/land-covers'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        type: 'FeatureCollection',
        features: expect.arrayContaining([
          {
            id: 1558394,
            geometry: {
              type: 'Polygon',
              coordinates: [
                expect.arrayContaining([
                  [268035.4069, 129537.1031],
                  [268024.9301, 129533.7199],
                  [268001.31, 129526.3199],
                  [268000, 129525.8899],
                  [267966.3901, 129514.9899],
                  [267968.0101, 129513.0999],
                  [267982.31, 129497.7999],
                  [267985.1101, 129494.2999],
                  [267988.9194, 129489.2799]
                ])
              ]
            },
            properties: {
              area: '9261.8',
              code: '131',
              name: 'Permanent Grassland',
              isBpsEligible: 'true'
            },
            type: 'Feature'
          }
        ])
      })
    })

    test('Should return data for /lms/organisation/{organisationId}/covers-summary/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/covers-summary/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual([
        {
          code: '110',
          name: 'Arable Land',
          area: 91844.34
        },
        {
          code: '130',
          name: 'Permanent Grassland',
          area: 79758.61
        },
        {
          code: '140',
          name: 'Permanent Crops',
          area: 4886.29
        }
      ])
    })

    test('Should throw error for /lms/organisation/{organisationId}/covers-summary/historic/{historicDate} if org does not exist', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/covers-summary/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(500)
    })
  })
})
