import { config } from '../../src/config.js'

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

  describe('Health route', () => {
    it('Should respond successfully for /health', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/health'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({ message: 'success' })
    })
  })

  describe('Person route', () => {
    const personFixture = {
      address: {
        address1: '65',
        address2: '1 McCullough Path',
        address3: 'Newton Ratkedon',
        address4: 'MS9 8BJ',
        address5: 'North Macedonia',
        addressTypeId: null,
        buildingName: null,
        buildingNumberRange: null,
        city: 'Newton Bruen',
        country: 'Wales',
        county: null,
        dependentLocality: null,
        doubleDependentLocality: null,
        flatName: null,
        pafOrganisationName: null,
        postalCode: 'TC2 8KP',
        street: null,
        uprn: '790214962932'
      },
      confirmed: false,
      customerReferenceNumber: '1111111100',
      dateOfBirth: 91391413473,
      deactivated: false,
      doNotContact: false,
      email: 'lauren.sanford@immaculate-shark.info',
      emailValidated: false,
      firstName: 'Lauren',
      id: 11111111,
      landline: '055 4582 4488',
      lastName: 'Sanford',
      locked: false,
      middleName: 'Daryl',
      mobile: '056 8967 5108',
      otherTitle: 'I',
      personalIdentifiers: ['8568845789', '370030956', '7899566034'],
      title: 'Mrs.'
    }

    test('Should return data /person/{personId}/summary', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/person/11111111/summary'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(personFixture)
    })

    test('Should return data /person/{personId}/summary corresponding to crn for personIdOverride', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `/extapi/person/${config.get('personIdOverride')}/summary`,
        headers: { crn: '1111111100' }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(expect.objectContaining(personFixture))
    })

    test('Should return data /person/search', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/extapi/person/search',
        payload: {
          primarySearchPhrase: '1111111100',
          searchFieldType: 'CUSTOMER_REFERENCE'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(1)
      expect(json._data[0]).toEqual({
        customerReference: '1111111100',
        deactivated: false,
        email: 'lauren.sanford@immaculate-shark.info',
        fullName: 'Lauren Sanford',
        id: 11111111,
        locked: false,
        nationalInsuranceNumber: null,
        personalIdentifiers: ['8568845789', '370030956', '7899566034'],
        primaryAddress: personFixture.address
      })
    })

    test('Should return data /organisation/person/{personId}/summary', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `/extapi/organisation/person/11111111/summary`
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(1)
      expect(json._data[0]).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          additionalSbiIds: [],
          confirmed: true,
          deactivated: false,
          id: 1111111111,
          landConfirmed: true,
          locked: false,
          name: 'Maggio, Murray and Dicki',
          sbi: 1111111111
        })
      )
    })

    test('Should accept data to PUT /person/{personId}', async () => {
      const payload = {
        id: 11111111,
        title: 'test-title',
        otherTitle: 'test-other-title',
        firstName: 'test-first-name',
        middleName: 'test-middle-name',
        lastName: 'test-last-name',
        dateOfBirth: -2,
        landline: 'test-landline',
        mobile: 'test-mobile',
        email: 'test-email@test.com',
        doNotContact: !personFixture.doNotContact,
        emailValidated: !personFixture.emailValidated,
        address: {
          address1: 'test-line-1',
          address2: 'test-line-2',
          address3: 'test-line-3',
          address4: 'test-line-4',
          address5: 'test-line-5',
          addressTypeId: null,
          buildingName: 'test-building-name',
          buildingNumberRange: 'test-building-number-range',
          city: 'test-city',
          country: 'test-country',
          county: 'test-county',
          dependentLocality: 'test-dependent-locality',
          doubleDependentLocality: 'test-double-dependent-locality',
          flatName: 'test-flat-name',
          pafOrganisationName: 'test-paf-organisation-name',
          postalCode: 'test-postal-code',
          street: 'test-street',
          uprn: 'test-uprn'
        },
        locked: !personFixture.locked,
        confirmed: !personFixture.confirmed,
        customerReferenceNumber: 'test-crn',
        personalIdentifiers: ['not', 'set'],
        deactivated: !personFixture.deactivated
      }

      const response = await mockServer.inject({
        method: 'PUT',
        url: '/extapi/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: { ...payload, address: { ...payload.address, extra: 'chuff' }, more: 'jazz' }
      })
      expect(response.statusCode).toBe(204)
      expect(response.payload).toBe('')

      const updated = await mockServer.inject({
        method: 'GET',
        url: '/extapi/person/11111111/summary'
      })
      expect(updated.statusCode).toBe(200)
      const json = JSON.parse(updated.payload)
      expect(json._data).toEqual({
        ...payload,
        // data which should not be updated remains the same
        customerReferenceNumber: personFixture.customerReferenceNumber,
        emailValidated: personFixture.emailValidated,
        confirmed: personFixture.confirmed,
        locked: personFixture.locked,
        deactivated: personFixture.deactivated,
        personalIdentifiers: personFixture.personalIdentifiers
      })
    })

    test('Should fail if no data PUT /person/{personId}', async () => {
      const response = await mockServer.inject({
        method: 'PUT',
        url: '/extapi/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: {}
      })

      expect(response.statusCode).toBe(422)
      expect(response.payload).toEqual('{"code":422,"message":"HTTP 422 "}')
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
          additionalBusinessActivities: null,
          additionalSbiIds: [],
          address: {
            address1: '14',
            address2: '16 Fourth Avenue',
            address3: 'Miller-under-Raynor',
            address4: 'XP0 6TX',
            address5: 'Saint Helena',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'South Witting Green',
            country: 'England',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null,
            pafOrganisationName: 'Maggio, Murray and Dicki',
            postalCode: 'IH1 1MM',
            street: null,
            uprn: '563449849116'
          },
          businessReference: '5305137528',
          businessType: {
            id: 962248,
            type: 'Not Specified'
          },
          charityCommissionRegistrationNumber: 'UtKAQapw',
          companiesHouseRegistrationNumber: 'yPDmr5q7',
          confirmed: true,
          correspondenceAddress: null,
          correspondenceEmail: 'Anita4@hotmail.com',
          correspondenceEmailValidated: true,
          correspondenceFax: null,
          correspondenceLandline: '0813 645 0023',
          correspondenceMobile: '0800 531443',
          deactivated: false,
          email: 'Joe_Pollich@gmail.com',
          emailValidated: true,
          fax: null,
          hasAdditionalBusinessActivities: false,
          hasLandInNorthernIreland: null,
          hasLandInScotland: false,
          hasLandInWales: true,
          id: 1111111111,
          isAccountablePeopleDeclarationCompleted: null,
          isCorrespondenceAsBusinessAddr: null,

          isFinancialToBusinessAddr: null,
          landConfirmed: true,
          landline: '010952 63723',
          legalStatus: {
            id: 671956,
            type: 'Sole Proprietorship'
          },
          locked: false,
          mobile: '0800 008521',
          name: 'Maggio, Murray and Dicki',
          persons: [],
          sbi: 1111111111,
          taxRegistrationNumber: '2272858234',
          traderNumber: '338653',
          vendorNumber: null
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
          additionalSbiIds: [],
          address: {
            address1: '14',
            address2: '16 Fourth Avenue',
            address3: 'Miller-under-Raynor',
            address4: 'XP0 6TX',
            address5: 'Saint Helena',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'South Witting Green',
            country: 'England',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null,
            pafOrganisationName: 'Maggio, Murray and Dicki',
            postalCode: 'IH1 1MM',
            street: null,
            uprn: '563449849116'
          },
          confirmed: true,
          correspondenceAddress: null,
          deactivated: false,
          id: 1111111111,
          isCorrespondenceAsBusinessAddr: null,
          isFinancialToBusinessAddr: null,
          landConfirmed: true,
          locked: false,
          name: 'Maggio, Murray and Dicki',
          sbi: 1111111111
        })
      )
    })

    test('Should return data for /organisation/create/{personId}', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/extapi/organisation/create/11111111',
        payload: {
          legalStatus: {
            id: 102101
          },
          businessType: {
            id: 101422
          },
          address: {
            flatName: null,
            buildingNumberRange: null,
            buildingName: 'BODYCHENAN',
            street: null,
            city: 'PWLLHELI',
            county: null,
            postalCode: 'LL53 8NT',
            country: 'United Kingdom',
            uprn: '10070366332',
            dependentLocality: 'LLANGWNADL',
            doubleDependentLocality: null
          },
          name: 'test unique 123',
          email: 'test@test.com',
          landline: '01234613020',
          mobile: '07111222333',
          companiesHouseRegistrationNumber: null,
          charityCommissionRegistrationNumber: '12312312',
          businessReference: '1106599951',
          hasAdditionalBusinessActivities: true,
          taxRegistrationNumber: '123456789'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          id: 1000001,
          sbi: 100000001,
          legalStatus: {
            id: 102101,
            type: 'Not set'
          },
          businessType: {
            id: 101422,
            type: 'Not set'
          },
          address: {
            address1: null,
            address2: null,
            address3: null,
            address4: null,
            address5: null,
            addressTypeId: null,
            flatName: null,
            buildingNumberRange: null,
            buildingName: 'BODYCHENAN',
            street: null,
            city: 'PWLLHELI',
            county: null,
            postalCode: 'LL53 8NT',
            country: 'United Kingdom',
            uprn: '10070366332',
            dependentLocality: 'LLANGWNADL',
            doubleDependentLocality: null,
            pafOrganisationName: null
          },
          correspondenceAddress: null,
          correspondenceFax: null,
          deactivated: false,
          fax: null,
          name: 'test unique 123',
          email: 'test@test.com',
          landline: '01234613020',
          mobile: '07111222333',
          landConfirmed: null,
          companiesHouseRegistrationNumber: null,
          charityCommissionRegistrationNumber: '12312312',
          businessReference: '1106599951',
          confirmed: true,
          locked: false,
          persons: [],
          additionalSbiIds: [],
          additionalBusinessActivities: null,
          hasAdditionalBusinessActivities: true,
          taxRegistrationNumber: '123456789'
        })
      )

      // Also check org added to person
      const personOrgs = await mockServer.inject({
        method: 'GET',
        url: `/extapi/organisation/person/11111111/summary`
      })

      expect(personOrgs.statusCode).toBe(200)
      const personJson = JSON.parse(personOrgs.payload)
      expect(personJson._data).toHaveLength(2)
      expect(personJson._data[1].id).toEqual(json._data.id)

      // Also check person added to org
      const orgPersons = await mockServer.inject({
        method: 'GET',
        url: `/extapi/authorisation/organisation/${json._data.id}`
      })

      expect(orgPersons.statusCode).toBe(200)
      const orgJson = JSON.parse(orgPersons.payload)
      expect(orgJson._data).toHaveLength(1)
      expect(orgJson._data[0].id).toEqual('11111111')
    })

    test('Should return data for /authorisation/organisation/{organisationId}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/authorisation/organisation/1111111111'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data[1]).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          firstName: 'Kristy',
          id: 11111112,
          customerReference: '1111111200',
          lastName: 'Stiedemann',
          lastUpdatedOn: 1735660238275,
          privileges: [
            'Full permission - business',
            'SUBMIT - CS APP - SA',
            'SUBMIT - CS AGREE - SA',
            'Amend - land',
            'Amend - entitlement',
            'Submit - bps',
            'SUBMIT - BPS - SA',
            'AMEND - ENTITLEMENT - SA',
            'AMEND - LAND - SA',
            'Submit - cs app',
            'Submit - cs agree',
            'ELM_APPLICATION_SUBMIT'
          ],
          role: 'Business Partner'
        })
      )
    })
  })

  describe('Notifications routes', () => {
    test('Should return data for /notifications', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/notifications?personId=11111111&organisationId=1111111111'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        notifications: expect.arrayContaining([
          {
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Absconditus tripudio coadunatio.</p>',
            category: 'OrganisationLevel',
            createdAt: 1703107872884,
            id: 4773520611,
            messageId: 4434992522,
            organisationId: 1111111111,
            personId: 11111111,
            readAt: 1733430747000,
            title: 'Amissio quae cado delicate antea nostrum.'
          },
          {
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Umbra aeger texo similique alveus vulgivagus.</p>',
            category: 'OrganisationLevel',
            createdAt: 1690586859290,
            id: 761422798,
            messageId: 2021325969,
            organisationId: 1111111111,
            personId: 11111111,
            readAt: 1709228434000,
            title: 'Comitatus aperio cito cruciamentum corrigo aureus.'
          }
        ]),
        resultCount: 9,
        readCount: 5,
        unreadCount: 4
      })
    })
  })
})
