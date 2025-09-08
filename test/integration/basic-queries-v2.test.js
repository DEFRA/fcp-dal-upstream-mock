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
          address: {
            address1: '635',
            address2: '72 Evert Green',
            address3: 'Kessler-upon-Altenwerth',
            address4: 'CO5 5GC',
            address5: 'Uzbekistan',
            pafOrganisationName: null,
            postalCode: 'SV14 7HI',
            street: null,
            uprn: '807723943667',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'Crona-on-West',
            country: 'England',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null
          },
          confirmed: true,
          customerReferenceNumber: '1111111100',
          deactivated: false,
          doNotContact: false,
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          emailValidated: true,
          firstName: 'Gerhard',
          id: 11111111,
          landline: '055 2317 9411',
          lastName: 'Purdy',
          locked: false,
          middleName: 'Shayna',
          mobile: '01650 95852',
          otherTitle: 'MD',
          personalIdentifiers: ['2356939974', '2348412591'],
          title: 'Mr.'
        })
      )
    })

    test('Should return data /person/{personId}/summary corresponding to crn for personIdOverride', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: `/extapi/person/${config.get('personIdOverride')}/summary`,
        headers: { crn: '1111111100' }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          address: {
            address1: '635',
            address2: '72 Evert Green',
            address3: 'Kessler-upon-Altenwerth',
            address4: 'CO5 5GC',
            address5: 'Uzbekistan',
            pafOrganisationName: null,
            postalCode: 'SV14 7HI',
            street: null,
            uprn: '807723943667',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'Crona-on-West',
            country: 'England',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null
          },
          confirmed: true,
          customerReferenceNumber: '1111111100',
          deactivated: false,
          doNotContact: false,
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          emailValidated: true,
          firstName: 'Gerhard',
          id: 11111111,
          landline: '055 2317 9411',
          lastName: 'Purdy',
          locked: false,
          middleName: 'Shayna',
          mobile: '01650 95852',
          otherTitle: 'MD',
          personalIdentifiers: ['2356939974', '2348412591'],
          title: 'Mr.'
        })
      )
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
      expect(json._data[0]).toEqual(
        // snippet only, due to size of person object
        expect.objectContaining({
          customerReference: '1111111100',
          deactivated: false,
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          fullName: 'Gerhard Purdy',
          id: 11111111,
          locked: false,
          nationalInsuranceNumber: null,
          personalIdentifiers: ['2356939974', '2348412591'],
          primaryAddress: {
            address1: '635',
            address2: '72 Evert Green',
            address3: 'Kessler-upon-Altenwerth',
            address4: 'CO5 5GC',
            address5: 'Uzbekistan',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'Crona-on-West',
            country: 'England',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null,
            pafOrganisationName: null,
            postalCode: 'SV14 7HI',
            street: null,
            uprn: '807723943667'
          }
        })
      )
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
      const response = await mockServer.inject({
        method: 'PUT',
        url: '/extapi/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: {
          id: 11111111,
          title: 'Mr.',
          otherTitle: 'MD',
          firstName: 'Gerhard',
          middleName: 'Shayna',
          lastName: 'Purdy',
          dateOfBirth: -442932358962,
          landline: '055 2317 9411',
          mobile: '01650 95852',
          email: 'gerhard.purdy@uncommon-sideboard.org.uk',
          doNotContact: false,
          emailValidated: true,
          address: {
            address1: '635',
            address2: '72 Evert Green',
            address3: 'Kessler-upon-Altenwerth',
            address4: 'CO5 5GC',
            address5: 'Uzbekistan',
            pafOrganisationName: null,
            flatName: null,
            buildingNumberRange: null,
            buildingName: null,
            street: null,
            city: 'Crona-on-West',
            county: null,
            postalCode: 'SV14 7HI',
            country: 'England',
            uprn: '807723943667',
            dependentLocality: null,
            doubleDependentLocality: null,
            addressTypeId: null
          },
          locked: false,
          confirmed: false,
          customerReferenceNumber: '1111111100',
          personalIdentifiers: ['2356939974', '2348412591'],
          deactivated: false
        }
      })

      expect(response.statusCode).toBe(204)
      expect(response.payload).toBe('')
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
      expect(json._data[0]).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
          firstName: 'Gerhard',
          id: 11111111,
          customerReference: '1111111100',
          lastName: 'Purdy',
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
        notifications: [
          {
            id: 8776831,
            personId: 5827629,
            organisationId: 7316417,
            messageId: 9745207,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 1792323602125,
            title:
              'Accedo adfero comes avaritia ventosus argentum delectatio talus surculus fugit.',
            body: '<p>Strues cras triduana tempore stabilis vomica adsum culpo asporto atque.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 5244065,
            personId: 5456657,
            organisationId: 729076,
            messageId: 5877233,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 2580178053430,
            title:
              'Corrumpo adulatio coadunatio bene impedit creator molestias amicitia conculco cui.',
            body: '<p>Stips thymbra ciminatio valens deporto magni usque absque appono repellat.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          }
        ],
        resultCount: 2,
        readCount: 0,
        unreadCount: 2
      })
    })
  })

  describe('Land routes', () => {
    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcels/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual([
        {
          id: '3818',
          sheetId: 'SS6828',
          parcelId: '3818',
          area: 8057.99,
          pendingDigitisation: false
        },
        {
          id: '0561',
          sheetId: 'SS7027',
          parcelId: '0561',
          area: 55053.31,
          pendingDigitisation: false
        },
        {
          id: '2061',
          sheetId: 'SS6728',
          parcelId: '2061',
          area: 406.78,
          pendingDigitisation: false
        },
        {
          id: '3753',
          sheetId: 'SS6629',
          parcelId: '3753',
          area: 12094.22,
          pendingDigitisation: false
        },
        {
          id: '4510',
          sheetId: 'SS6829',
          parcelId: '4510',
          area: 75281.67,
          pendingDigitisation: false
        },
        {
          id: '2105',
          sheetId: 'SS6928',
          parcelId: '2105',
          area: 66682.14,
          pendingDigitisation: false
        },
        {
          id: '3826',
          sheetId: 'SS6928',
          parcelId: '3826',
          area: 65854.46,
          pendingDigitisation: false
        },
        {
          id: '5248',
          sheetId: 'SS6829',
          parcelId: '5248',
          area: 7973.57,
          pendingDigitisation: false
        },
        {
          id: '9767',
          sheetId: 'SS6529',
          parcelId: '9767',
          area: 25198.34,
          pendingDigitisation: false
        },
        {
          id: '3616',
          sheetId: 'SS6630',
          parcelId: '3616',
          area: 50660.2,
          pendingDigitisation: false
        },
        {
          id: '6585',
          sheetId: 'SS6528',
          parcelId: '6585',
          area: 45050.59,
          pendingDigitisation: false
        },
        {
          id: '4510',
          sheetId: 'SS6629',
          parcelId: '4510',
          area: 3344.19,
          pendingDigitisation: false
        },
        {
          id: '6480',
          sheetId: 'SS6728',
          parcelId: '6480',
          area: 22063.31,
          pendingDigitisation: false
        },
        {
          id: '2554',
          sheetId: 'SS6830',
          parcelId: '2554',
          area: 22911.41,
          pendingDigitisation: false
        },
        {
          id: '8425',
          sheetId: 'SS6728',
          parcelId: '8425',
          area: 49525.57,
          pendingDigitisation: false
        },
        {
          id: '4989',
          sheetId: 'SS6728',
          parcelId: '4989',
          area: 5395.39,
          pendingDigitisation: false
        },
        {
          id: '7730',
          sheetId: 'SS6629',
          parcelId: '7730',
          area: 6309.37,
          pendingDigitisation: false
        },
        {
          id: '6845',
          sheetId: 'SS6830',
          parcelId: '6845',
          area: 2139.2,
          pendingDigitisation: false
        },
        {
          id: '0352',
          sheetId: 'SS6628',
          parcelId: '0352',
          area: 2123.65,
          pendingDigitisation: false
        },
        {
          id: '1654',
          sheetId: 'SS6529',
          parcelId: '1654',
          area: 2076.81,
          pendingDigitisation: false
        },
        {
          id: '9756',
          sheetId: 'SS6529',
          parcelId: '9756',
          area: 29679.72,
          pendingDigitisation: false
        },
        {
          id: '2482',
          sheetId: 'SS6827',
          parcelId: '2482',
          area: 10287.44,
          pendingDigitisation: false
        },
        {
          id: '1733',
          sheetId: 'SS6828',
          parcelId: '1733',
          area: 7738.05,
          pendingDigitisation: false
        },
        {
          id: '3950',
          sheetId: 'SS6728',
          parcelId: '3950',
          area: 8069.43,
          pendingDigitisation: false
        },
        {
          id: '6705',
          sheetId: 'SS6628',
          parcelId: '6705',
          area: 6458.7,
          pendingDigitisation: false
        },
        {
          id: '2566',
          sheetId: 'SS6828',
          parcelId: '2566',
          area: 14368.09,
          pendingDigitisation: false
        },
        {
          id: '9113',
          sheetId: 'SS6630',
          parcelId: '9113',
          area: 45656.31,
          pendingDigitisation: false
        },
        {
          id: '6021',
          sheetId: 'SS6828',
          parcelId: '6021',
          area: 909.71,
          pendingDigitisation: false
        },
        {
          id: '2110',
          sheetId: 'SS6530',
          parcelId: '2110',
          area: 7759.66,
          pendingDigitisation: false
        },
        {
          id: '1620',
          sheetId: 'SS6628',
          parcelId: '1620',
          area: 3325.31,
          pendingDigitisation: false
        },
        {
          id: '7342',
          sheetId: 'SS6828',
          parcelId: '7342',
          area: 2196.49,
          pendingDigitisation: false
        },
        {
          id: '7736',
          sheetId: 'SS6528',
          parcelId: '7736',
          area: 7448.47,
          pendingDigitisation: false
        },
        {
          id: '5536',
          sheetId: 'SS6629',
          parcelId: '5536',
          area: 28283.52,
          pendingDigitisation: false
        },
        {
          id: '6787',
          sheetId: 'SS6629',
          parcelId: '6787',
          area: 2574.85,
          pendingDigitisation: false
        },
        {
          id: '1695',
          sheetId: 'SS6828',
          parcelId: '1695',
          area: 15371.87,
          pendingDigitisation: false
        },
        {
          id: '7942',
          sheetId: 'SS6928',
          parcelId: '7942',
          area: 54773.3,
          pendingDigitisation: false
        },
        {
          id: '0385',
          sheetId: 'SS6829',
          parcelId: '0385',
          area: 49207.97,
          pendingDigitisation: false
        },
        {
          id: '0556',
          sheetId: 'SS6628',
          parcelId: '0556',
          area: 11215.67,
          pendingDigitisation: false
        },
        {
          id: '9997',
          sheetId: 'SS6627',
          parcelId: '9997',
          area: 14512.67,
          pendingDigitisation: false
        },
        {
          id: '5527',
          sheetId: 'SS6728',
          parcelId: '5527',
          area: 122432.17,
          pendingDigitisation: false
        },
        {
          id: '4434',
          sheetId: 'SS6628',
          parcelId: '4434',
          area: 29197.15,
          pendingDigitisation: false
        },
        {
          id: '3735',
          sheetId: 'SS6727',
          parcelId: '3735',
          area: 4108.73,
          pendingDigitisation: false
        },
        {
          id: '2933',
          sheetId: 'SS6828',
          parcelId: '2933',
          area: 9522.58,
          pendingDigitisation: false
        },
        {
          id: '5419',
          sheetId: 'SS6928',
          parcelId: '5419',
          area: 1964.47,
          pendingDigitisation: false
        },
        {
          id: '3427',
          sheetId: 'SS6728',
          parcelId: '3427',
          area: 410.18,
          pendingDigitisation: false
        },
        {
          id: '4558',
          sheetId: 'SS6728',
          parcelId: '4558',
          area: 4288.47,
          pendingDigitisation: false
        },
        {
          id: '7399',
          sheetId: 'SS6827',
          parcelId: '7399',
          area: 19644.16,
          pendingDigitisation: false
        }
      ])
    })

    test('Should return data for /lms/organisation/{organisationId}/parcel-details/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel-details/historic/01-Jan-25'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json[0]).toEqual(
        expect.objectContaining({
          sheetId: 'SS6828',
          parcelId: '3818',
          validFrom: expect.any(Number),
          validTo: expect.any(Number)
        })
      )
      expect(json[json.length - 1]).toEqual(
        expect.objectContaining({
          sheetId: 'SS6827',
          parcelId: '7399',
          validFrom: expect.any(Number),
          validTo: expect.any(Number)
        })
      )
    })

    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate}', async () => {
      const response = await mockServer.inject({
        method: 'GET',
        url: '/extapi/lms/organisation/1111111111/parcel/sheet-id/SS6828/parcel-id/3818/land-covers'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json).toEqual({
        type: 'FeatureCollection',
        features: [
          {
            id: 12151270,
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [268406.569, 128157.38],
                  [268406.839, 128167.793],
                  [268397.38, 128169.16],
                  [268399.56, 128177.94],
                  [268397.09, 128178.2],
                  [268392.93, 128178.81],
                  [268361.27, 128183.45],
                  [268358.21, 128183.75],
                  [268348.71, 128184.368],
                  [268347.826, 128176.821],
                  [268346.604, 128167.295],
                  [268367.207, 128163.48],
                  [268366.857, 128162.503],
                  [268366.075, 128160.3211],
                  [268364.336, 128155.469],
                  [268363.701, 128152.373],
                  [268364.415, 128149.119],
                  [268367.511, 128145.785],
                  [268371.479, 128143.086],
                  [268377.591, 128139.832],
                  [268382.671, 128138.482],
                  [268386.561, 128138.006],
                  [268390.212, 128137.689],
                  [268394.175, 128138.338],
                  [268395.054, 128138.482],
                  [268397.118, 128139.514],
                  [268399.102, 128141.34],
                  [268400.927, 128143.534],
                  [268401.96, 128149.357],
                  [268403.785, 128153.96],
                  [268404.896, 128155.707],
                  [268406.569, 128157.38]
                ]
              ]
            },
            properties: {
              area: '1810.9',
              code: '525',
              name: 'Structure',
              isBpsEligible: 'false'
            },
            type: 'Feature'
          },
          {
            id: 12151271,
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [268346.604, 128167.295],
                  [268347.826, 128176.821],
                  [268348.71, 128184.368],
                  [268358.21, 128183.75],
                  [268361.27, 128183.45],
                  [268392.93, 128178.81],
                  [268397.09, 128178.2],
                  [268399.56, 128177.94],
                  [268397.38, 128169.16],
                  [268406.839, 128167.793],
                  [268406.569, 128157.38],
                  [268409.925, 128158.5714],
                  [268413.707, 128159.914],
                  [268418.036, 128161.89],
                  [268419.74, 128162.692],
                  [268423.631, 128163.831],
                  [268426.862, 128163.462],
                  [268431.545, 128161.953],
                  [268445.8846, 128156.7331],
                  [268449.643, 128155.365],
                  [268451.31, 128155.365],
                  [268452.659, 128156],
                  [268453.063, 128157.853],
                  [268459.569, 128169.672],
                  [268461.914, 128173.408],
                  [268465.172, 128173.088],
                  [268465.658, 128175.339],
                  [268471.961, 128174.407],
                  [268472.58, 128176.28],
                  [268473.92, 128177.37],
                  [268475.55, 128177.66],
                  [268488.7273, 128175.6139],
                  [268491.9019, 128175.121],
                  [268494.5586, 128174.7085],
                  [268494.9614, 128187.245],
                  [268481.635, 128191.379],
                  [268474.286, 128193.659],
                  [268469.103, 128194.145],
                  [268468.0819, 128183.4516],
                  [268463.051, 128183.738],
                  [268460.74, 128183.87],
                  [268442.67, 128185.31],
                  [268442.05, 128177.81],
                  [268417.91, 128179.83],
                  [268418.444, 128186.167],
                  [268394.268, 128188.203],
                  [268394.36, 128189.39],
                  [268379.848, 128190.525],
                  [268365.98, 128191.61],
                  [268357.18, 128192.3],
                  [268335, 128194.03],
                  [268321.23, 128195.19],
                  [268314.49, 128195.83],
                  [268294.49, 128198.43],
                  [268293.259, 128198.459],
                  [268288.211, 128202.778],
                  [268284.199, 128206.635],
                  [268280.6658, 128209.4104],
                  [268279.94, 128204.58],
                  [268282.45, 128202.41],
                  [268285.29, 128199.92],
                  [268289.4, 128196.55],
                  [268293.05, 128194.26],
                  [268296.83, 128192.62],
                  [268313.47, 128189.37],
                  [268314.114, 128189.243],
                  [268316.8036, 128188.4213],
                  [268319.79, 128187.42],
                  [268324.05, 128185.7],
                  [268331.6, 128180.42],
                  [268334.19, 128177.63],
                  [268336.69, 128178.85],
                  [268338.77, 128179.88],
                  [268342.51, 128177.8804],
                  [268343.7131, 128170.4429],
                  [268346.604, 128167.295]
                ]
              ]
            },
            properties: {
              area: '2926.54',
              code: '379',
              name: 'Farmyards',
              isBpsEligible: 'false'
            },
            type: 'Feature'
          },
          {
            id: 12151272,
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [268464.9997, 128172.2892],
                  [268465.1721, 128173.088],
                  [268461.914, 128173.408],
                  [268459.569, 128169.672],
                  [268453.063, 128157.853],
                  [268452.659, 128156],
                  [268451.31, 128155.365],
                  [268449.643, 128155.365],
                  [268445.8846, 128156.7331],
                  [268431.545, 128161.953],
                  [268426.862, 128163.462],
                  [268423.631, 128163.831],
                  [268419.74, 128162.692],
                  [268418.036, 128161.89],
                  [268413.707, 128159.914],
                  [268409.925, 128158.5714],
                  [268406.569, 128157.38],
                  [268404.896, 128155.707],
                  [268403.785, 128153.96],
                  [268401.96, 128149.357],
                  [268400.927, 128143.534],
                  [268399.102, 128133.244],
                  [268400.202, 128127.855],
                  [268392.45, 128117.65],
                  [268378.9201, 128107.0599],
                  [268379.6895, 128105.2097],
                  [268379.69, 128105.21],
                  [268407.089, 128114.3698],
                  [268417.2, 128117.75],
                  [268439.11, 128125.52],
                  [268442.46, 128127.33],
                  [268447.98, 128131.09],
                  [268453.13, 128135.43],
                  [268456.64, 128140.08],
                  [268458.53, 128144.34],
                  [268460.05, 128150.98],
                  [268462.14, 128159.04],
                  [268464.9997, 128172.2892]
                ]
              ]
            },
            properties: {
              area: '2354.46',
              code: '332',
              name: 'Woodland',
              isBpsEligible: 'false'
            },
            type: 'Feature'
          },
          {
            id: 12151268,
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [268471.1929, 128172.1481],
                  [268471.961, 128174.407],
                  [268465.658, 128175.339],
                  [268465.1721, 128173.088],
                  [268464.9997, 128172.2892],
                  [268462.14, 128159.04],
                  [268460.05, 128150.98],
                  [268458.53, 128144.34],
                  [268456.64, 128140.08],
                  [268453.13, 128135.43],
                  [268447.98, 128131.09],
                  [268442.46, 128127.33],
                  [268439.11, 128125.52],
                  [268417.2, 128117.75],
                  [268407.089, 128114.3698],
                  [268379.69, 128105.21],
                  [268379.6895, 128105.2097],
                  [268380.5901, 128103.0442],
                  [268381.6143, 128100.5814],
                  [268381.6337, 128100.5347],
                  [268384.1989, 128101.4453],
                  [268418.83, 128113.02],
                  [268441.15, 128120.94],
                  [268445.06, 128123.05],
                  [268451.01, 128127.1],
                  [268456.78, 128131.97],
                  [268460.98, 128137.53],
                  [268463.3, 128142.75],
                  [268464.91, 128149.79],
                  [268466.97, 128157.75],
                  [268469.83, 128168.14],
                  [268471.1929, 128172.1481]
                ]
              ]
            },
            properties: {
              area: '634.25',
              code: '631',
              name: 'Metalled track',
              isBpsEligible: 'false'
            },
            type: 'Feature'
          },
          {
            id: 12151269,
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [268400.927, 128143.534],
                  [268399.102, 128141.34],
                  [268397.118, 128139.514],
                  [268395.054, 128138.482],
                  [268394.175, 128138.338],
                  [268390.212, 128137.689],
                  [268386.561, 128138.006],
                  [268382.671, 128138.482],
                  [268377.591, 128139.832],
                  [268371.479, 128143.086],
                  [268367.511, 128145.785],
                  [268364.415, 128149.119],
                  [268363.701, 128152.373],
                  [268364.336, 128155.469],
                  [268366.075, 128160.3211],
                  [268366.857, 128162.503],
                  [268367.207, 128163.48],
                  [268346.604, 128167.295],
                  [268346.6457, 128167.273],
                  [268349.104, 128165.975],
                  [268355.922, 128162.374],
                  [268356.708, 128155.519],
                  [268376.639, 128132.291],
                  [268393.731, 128133.016],
                  [268397.3106, 128133.168],
                  [268399.102, 128133.244],
                  [268400.927, 128143.534]
                ]
              ]
            },
            properties: {
              area: '331.83',
              code: '379',
              name: 'Farmyards',
              isBpsEligible: 'false'
            },
            type: 'Feature'
          }
        ]
      })
    })

    test('Should return data for /lms/organisation/{organisationId}/parcels/historic/{historicDate}', async () => {
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
          area: 228294
        },
        {
          code: '130',
          name: 'Permanent Grassland',
          area: 511507.74
        },
        {
          code: '140',
          name: 'Permanent Crops',
          area: 0
        }
      ])
    })
  })
})
