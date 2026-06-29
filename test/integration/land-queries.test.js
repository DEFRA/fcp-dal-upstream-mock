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
    mockServer?.stop({ timeout: 0 })
  })

  describe('Land routes', () => {
    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate} where land is defined in id-lookups for the organisation', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual(
        expect.arrayContaining([
          {
            area: 10270.39,
            id: 7386091,
            parcelId: '5662',
            pendingDigitisation: false,
            sheetId: 'SS6627'
          },
          {
            area: 10270.39,
            id: 7386092,
            parcelId: '3818',
            pendingDigitisation: false,
            sheetId: 'SS6828'
          }
        ])
      )
    })

    test('Should return 403 for /lms/organisation/{organisationId}/parcels/historic/{historicDate} if organisationId is not numeric', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return 500 for /lms/organisation/{organisationId}/parcels/historic/{historicDate} if historicDate is invalid', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcels/historic/invalid'
      })
      expect(response.statusCode).toBe(500)
    })

    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate} where land is NOT defined in id-lookups for the organisation', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/2222222222/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual(
        expect.arrayContaining([
          {
            area: 703984.4376616875,
            id: 6868061,
            parcelId: '5845',
            pendingDigitisation: false,
            sheetId: 'EYDNVG'
          },
          {
            area: 853382.7997174974,
            id: 2016887,
            parcelId: '2422',
            pendingDigitisation: false,
            sheetId: 'PNUMWF'
          }
        ])
      )
    })

    test('Should not return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate} where land is defined AND empty in id-lookups for the organisation', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1000000000/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual([])
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
          expect.objectContaining({ parcelId: '5662', sheetId: 'SS6627' }),
          expect.objectContaining({ parcelId: '3818', sheetId: 'SS6828' })
        ])
      )
    })

    test('Should return 403 for /lms/organisation/{organisationId}/parcel-details/historic/{historicDate} if organisationId is not numeric', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/parcel-details/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return 403 for /lms/organisation/{organisationId}/parcel-details/historic/{historicDate} if historicDate is invalid', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel-details/historic/invalid'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return data for /lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers with geometries omitted by default', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6627/parcel-id/5662/historic/01-Mar-25/land-covers'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        type: 'FeatureCollection',
        features: expect.arrayContaining([
          {
            id: 11769295,
            properties: {
              area: '10270.38',
              code: '110',
              name: 'Arable Land',
              isBpsEligible: 'true'
            },
            type: 'Feature',
            geometry: null
          }
        ])
      })
    })

    test('Should return data for /lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers with geometries included when requested', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6627/parcel-id/5662/historic/01-Mar-25/land-covers?includeGeometries=true'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        type: 'FeatureCollection',
        features: expect.arrayContaining([
          {
            id: 11769295,
            properties: {
              area: '10270.38',
              code: '110',
              name: 'Arable Land',
              isBpsEligible: 'true'
            },
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                expect.arrayContaining([
                  [267996.4077, 128598.2581],
                  [267996.918, 128598.085],
                  [268028.15, 128535.31],
                  [268031.3375, 128528.8885],
                  [268039.0495, 128513.3517]
                ])
              ]
            }
          }
        ])
      })
    })

    test('Should return 403 for /lms/organisation/{organisationId}/land-covers if organisationId is not numeric', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/parcel/sheet-id/SS6627/parcel-id/5662/historic/01-Mar-25/land-covers'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should treat includeGeometries=null as false for land-covers', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6627/parcel-id/5662/historic/01-Mar-25/land-covers?includeGeometries=null'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json.features[0].geometry).toBeNull()
    })

    test('Should treat any unrecognised includeGeometries value as false', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6627/parcel-id/5662/historic/01-Mar-25/land-covers?includeGeometries=foo'
      })
      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.payload).features[0].geometry).toBeNull()
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
          area: 10270.38
        },
        {
          code: '130',
          name: 'Permanent Grassland',
          area: 0
        },
        {
          code: '140',
          name: 'Permanent Crops',
          area: 0
        }
      ])
    })

    test('Should throw error for /lms/organisation/{organisationId}/covers-summary/historic/{historicDate} if org does not exist', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/9999999999/covers-summary/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(500)
    })

    test('Should return 403 for /lms/organisation/{organisationId}/covers-summary/historic/{historicDate} if organisationId is not numeric', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/covers-summary/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return 403 for /lms/organisation/{organisationId}/covers-summary/historic/{historicDate} if historicDate is invalid', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/covers-summary/historic/invalid'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return data for /lms/organisation/{organisationId}/geometries', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/geometries?bbox=0,0,0,0'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        features: expect.arrayContaining([
          expect.objectContaining({
            id: 7386091,
            type: 'Feature',
            properties: {
              sheetId: 'SS6627',
              parcelId: '5662',
              area: '10270.39',
              pendingDigitisation: 'false'
            },
            geometry: expect.objectContaining({ type: 'Polygon' })
          })
        ])
      })
    })

    test('Should return 403 for /lms/organisation/{organisationId}/geometries if organisationId is not numeric', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/nonexistent/geometries?bbox=0,0,0,0'
      })
      expect(response.statusCode).toBe(403)
    })

    test('Should return 400 for /lms/organisation/{organisationId}/geometries if bbox is missing', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/geometries'
      })
      expect(response.statusCode).toBe(400)
    })

    test('Should return 400 for /lms/organisation/{organisationId}/geometries if bbox is empty', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/geometries?bbox='
      })
      expect(response.statusCode).toBe(400)
    })

    test.each([
      ['too few coordinates', '1,1,1'],
      ['too many coordinates', '1,1,1,1,1'],
      ['non-numeric coordinates', 'a,b,c,d']
    ])(
      'Should return 404 for /lms/organisation/{organisationId}/geometries if bbox has %s (%s)',
      async (_description, bbox) => {
        const response = await mockServer.inject({
          method: 'GET',
          url: `/extapi/lms/organisation/1111111111/geometries?bbox=${bbox}`
        })
        expect(response.statusCode).toBe(404)
      }
    )

    test('Should return data for /lms/organisation/{organisationId}/geometries if bbox contains signed/leading-zero coordinates', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/geometries?bbox=-1.5,%2B2.0,1,00.1'
      })
      expect(response.statusCode).toBe(200)
    })
  })
})
