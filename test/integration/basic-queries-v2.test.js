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
          customerReferenceNumber: 'crn-11111111',
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
        headers: { crn: 'crn-11111111' }
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
          customerReferenceNumber: 'crn-11111111',
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
          customerReference: 'crn-11111111',
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
          lastUpdatedOn: null,
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
          confirmed: true,
          firstName: 'Gerhard',
          id: 11111111,
          customerReference: 'crn-11111111',
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
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Tabgo sunt tot atrocitas decimus taedium cito concido derideo timor.</p>',
            category: 'OrganisationLevel',
            createdAt: 6353721337460,
            id: 8756824,
            messageId: 8528869,
            organisationId: 1865095,
            personId: 2317941,
            readAt: 28000,
            title: 'Amo ipsam expedita minima cavus alius vitiosus vester ars viduo.'
          },
          {
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Beneficium pauper amiculum verto conspergo adduco cresco dedecor vulticulus.</p>',
            category: 'OrganisationLevel',
            createdAt: 7758367211338,
            id: 772394,
            messageId: 6341876,
            organisationId: 2291324,
            personId: 3667985,
            readAt: 28000,
            title: 'Caelum tollo comprehendo coerceo cibus somnus inflammatio bis nihil quidem.'
          },
          {
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Caries trucido acervus volaticus cariosus suscipit voluptatem deprimo.</p>',
            category: 'OrganisationLevel',
            createdAt: 5062780700137,
            id: 9779606,
            messageId: 3482337,
            organisationId: 5067640,
            personId: 3453095,
            readAt: 24000,
            title: 'Conor ventus at celebrer terga agnosco abeo armarium verbum atrox.'
          },
          {
            archive: null,
            archivedAt: null,
            bespokeNotificationId: null,
            body: '<p>Adulatio suasoria amo ipsam celebrer patruus solitudo tristis.</p>',
            category: 'OrganisationLevel',
            createdAt: 309947138734,
            id: 1353432,
            messageId: 3530898,
            organisationId: 3284925,
            personId: 4341222,
            readAt: null,
            title: 'Curia universe saepe decimus tres vigor articulus defleo ancilla sol.'
          }
        ],
        readCount: 3,
        resultCount: 4,
        unreadCount: 1
      })
    })
  })
})
