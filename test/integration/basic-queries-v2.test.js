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
            id: 762254,
            personId: 4582448,
            organisationId: 8589675,
            messageId: 1083836,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 5659061581972,
            title:
              'Deleo sub vestigium torqueo adimpleo cornu somniculosus cubicularis votum amplitudo.',
            body: '<p>Teneo alveus caveo vado cupiditas.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 6979021,
            personId: 4962932,
            organisationId: 7998078,
            messageId: 3299336,
            readAt: 18000,
            archivedAt: null,
            archive: null,
            createdAt: 9652713548578,
            title: 'Asper enim umquam acer spero commodo vel curto alii vomito.',
            body: '<p>Ullam terminatio carmen.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 5805687,
            personId: 7700022,
            organisationId: 7947778,
            messageId: 9113026,
            readAt: 6000,
            archivedAt: null,
            archive: null,
            createdAt: 5585958715791,
            title:
              'Aegre ullam perspiciatis auctus aedificium convoco aggredior thymbra delectus articulus.',
            body: '<p>Explicabo tribuo clibanus.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 7298134,
            personId: 6374864,
            organisationId: 6507170,
            messageId: 4865488,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 4889174050984,
            title: 'Tamdiu abeo ante tergiversatio cogo usus neque ante conspergo vergo.',
            body: '<p>Cognomen abutor velum socius infit claustrum.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 7371735,
            personId: 6730705,
            organisationId: 5064354,
            messageId: 323686,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 5120032406981,
            title:
              'Subseco contabesco verumtamen adinventitias adulatio ventito audeo eos eligendi aspernatur.',
            body: '<p>Comes capto suggero crebro.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          },
          {
            id: 7448782,
            personId: 8421523,
            organisationId: 6641675,
            messageId: 7831347,
            readAt: null,
            archivedAt: null,
            archive: null,
            createdAt: 2656213060144,
            title: 'Cena astrum voveo desparatus accendo commemoro eius spiritus avarus votum.',
            body: '<p>Assentator sumptus adimpleo tempora talus pauci.</p>',
            category: 'OrganisationLevel',
            bespokeNotificationId: null
          }
        ],
        resultCount: 6,
        readCount: 2,
        unreadCount: 4
      })
    })
  })
})
