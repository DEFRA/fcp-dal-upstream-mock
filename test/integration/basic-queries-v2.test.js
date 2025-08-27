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
          additionalSbiIds: [],
          address: {
            address1: '51',
            address2: '527 Alicia Bank',
            address3: 'Kiehn-over-Mosciski',
            address4: 'XP4 7DL',
            address5: 'Puerto Rico',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'Mooreingham',
            country: 'Wales',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null,
            pafOrganisationName: 'Lowe - Wolf',
            postalCode: 'UY42 9SO',
            street: null,
            uprn: '903411609185'
          },
          confirmed: true,
          correspondenceAddress: null,
          deactivated: false,
          id: 1111111111,
          isCorrespondenceAsBusinessAddr: null,
          isFinancialToBusinessAddr: true,
          landConfirmed: false,
          locked: false,
          name: 'Lowe - Wolf',
          sbi: 1111111111
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
            address1: '51',
            address2: '527 Alicia Bank',
            address3: 'Kiehn-over-Mosciski',
            address4: 'XP4 7DL',
            address5: 'Puerto Rico',
            addressTypeId: null,
            buildingName: null,
            buildingNumberRange: null,
            city: 'Mooreingham',
            country: 'Wales',
            county: null,
            dependentLocality: null,
            doubleDependentLocality: null,
            flatName: null,
            pafOrganisationName: 'Lowe - Wolf',
            postalCode: 'UY42 9SO',
            street: null,
            uprn: '903411609185'
          },
          confirmed: true,
          correspondenceAddress: null,
          deactivated: false,
          id: 1111111111,
          isCorrespondenceAsBusinessAddr: null,
          isFinancialToBusinessAddr: true,
          landConfirmed: false,
          locked: false,
          name: 'Lowe - Wolf',
          sbi: 1111111111
        })
      )
    })

    test('Should return data for /organisation/create/{personId}', async () => {
      const response = await mockServer.inject({
        method: 'POST',
        url: '/extapi/organisation/create/1111111111',
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
      expect(json._data.id).toBeDefined()
      expect(json._data).toEqual(
        // snippet only, due to size of org object
        expect.objectContaining({
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
    })
  })
})
