import Hapi from '@hapi/hapi'
import { config } from '../../../../../src/config.js'
import { person } from '../../../../../src/routes/kits-v1/person.js'
import { loadSchema } from '../../../../../src/utils/validatePayload.js'

describe('Person routes', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(person)
    await Promise.all([
      server.initialize(),
      loadSchema('/routes/kits-v1/person-schema.oas.yml').then((s) => (schema = s))
    ])
  })

  describe('GET /person/{email}/validateEmail', () => {
    it('should report a known email as duplicated, conforming to the schema', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/skeleton@the-closet.net/validateEmail'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: true } })
      expect(result).toConformToSchema(
        schema.paths['/person/{email}/validateEmail'].get.responses['200'].content[
          'application/json'
        ].schema
      )
    })

    it('should report an unknown email as not duplicated', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/nobody-with-this-address@example.com/validateEmail'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: false } })
    })

    it('should be case-insensitive when matching emails', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/SKELETON@THE-CLOSET.NET/validateEmail'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: true } })
    })

    it('should URL-decode the email path parameter', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: `/person/${encodeURIComponent('skeleton@the-closet.net')}/validateEmail`
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: true } })
    })

    it('should not error when static fixtures have a null email', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/3010085@example.com/validateEmail'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: false } })
    })

    it('should not report a duplicate when the matching person has not validated their email', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/unvalidated@the-closet.net/validateEmail'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: { emailDuplicated: false } })
    })
  })

  describe('GET /person/{personId}/{email}/confirm', () => {
    it('should report the email as validated when it matches an already-validated person email, conforming to the schema', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/11111119/skeleton@the-closet.net/confirm'
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({
        _data: {
          id: expect.any(Number),
          partyId: 11111119,
          mdmPartyContactId: null,
          digitalContactType: { id: 100301, type: 'Email Address' },
          digitalAddress: 'skeleton@the-closet.net',
          validated: true
        }
      })
      expect(result._data.id).not.toBe(11111119)
      expect(result).toConformToSchema(
        schema.paths['/person/{personId}/{email}/confirm'].get.responses['200'].content[
          'application/json'
        ].schema
      )
    })

    it('should not update the person record, and should not report the email as validated when the person has not validated their email', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/11111121/unvalidated@the-closet.net/confirm'
      })
      expect(statusCode).toBe(200)
      expect(result._data.validated).toBe(false)

      const { result: summaryResult } = await server.inject({
        method: 'GET',
        url: '/person/11111121/summary'
      })
      expect(summaryResult._data.emailValidated).toBe(false)
    })

    it('should return 404 when the person does not have any email assigned', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/person/3010085/someone@example.com/confirm'
      })
      expect(statusCode).toBe(404)
      expect(result.message).toBe('Person does not have any email assigned')
    })

    it('should return 403 for an invalid personId', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/person/not-a-number/someone@example.com/confirm'
      })
      expect(statusCode).toBe(403)
    })
  })

  describe('POST /verify-email/{digitalContactPartyId}', () => {
    const getDigitalContactPartyId = async (personId, email) => {
      const { result } = await server.inject({
        method: 'GET',
        url: `/person/${personId}/${email}/confirm`
      })
      return result._data.id
    }

    it('should return a 200 for a known digitalContactPartyId, conforming to the schema', async () => {
      const digitalContactPartyId = await getDigitalContactPartyId(
        11111119,
        'skeleton@the-closet.net'
      )

      const { result, statusCode } = await server.inject({
        method: 'POST',
        url: `/verify-email/${digitalContactPartyId}`
      })
      expect(statusCode).toBe(200)
      expect(result).toEqual({ _data: 'Success' })
      expect(result).toConformToSchema(
        schema.paths['/verify-email/{digitalContactPartyId}'].post.responses['200'].content[
          'application/json'
        ].schema
      )
    })

    // TODO: Need to verify this behaviour in ext-test as in test a 200 is returned regardless
    it('should return 404 for a well-formed but unknown digitalContactPartyId', async () => {
      const { statusCode } = await server.inject({
        method: 'POST',
        url: '/verify-email/999999999'
      })
      expect(statusCode).toBe(404)
    })

    it('should return 403 for an invalid digitalContactPartyId', async () => {
      const { statusCode } = await server.inject({
        method: 'POST',
        url: '/verify-email/not-a-number'
      })
      expect(statusCode).toBe(403)
    })
  })

  it('should GET a person conforming to the schema', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/person/11111111/summary'
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/person/{personId}/summary'].get.responses['200'].content['application/json']
        .schema
    )
  })

  it('should respond with a person conforming to schema when searches POST-ed', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/person/search',
      payload: {
        searchFieldType: 'CUSTOMER_REFERENCE',
        primarySearchPhrase: '1111111100'
      }
    })
    expect(statusCode).toBe(200)
    expect(result).toConformToSchema(
      schema.paths['/person/search'].post.responses['200'].content['application/json'].schema
    )
  })

  it('should fetch the same person with ID or CRN', async () => {
    const id = 11111111
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: `/person/${id}/summary`
    })
    expect(statusCode).toBe(200)
    expect(result._data.id).toBe(id)
    const {
      firstName,
      lastName,
      address,
      personalIdentifiers,
      customerReferenceNumber,
      email,
      locked,
      deactivated
    } = result._data

    const res2 = await server.inject({
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      url: '/person/search',
      payload: {
        searchFieldType: 'CUSTOMER_REFERENCE',
        primarySearchPhrase: customerReferenceNumber
      }
    })
    expect(res2.statusCode).toBe(200)
    expect(res2.result._data.length).toBe(1)
    const samePerson = res2.result._data[0]
    expect(samePerson).toEqual({
      id,
      fullName: `${firstName} ${lastName}`,
      primaryAddress: address,
      personalIdentifiers: personalIdentifiers,
      nationalInsuranceNumber: null,
      customerReference: customerReferenceNumber,
      email: email,
      locked: locked,
      deactivated: deactivated
    })
  })

  test("should return data for about the specified user's associated organisations", async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/organisation/person/11111222/summary'
    })
    expect(statusCode).toBe(200)
    expect(result._data).toHaveLength(2)
    expect(result._data).toEqual(
      // snippets only, to indicate the 2 organisations this user belongs to
      expect.arrayContaining([
        expect.objectContaining({
          id: 111111111,
          sbi: 111111111
        }),
        expect.objectContaining({
          id: 222222222,
          sbi: 222222222
        })
      ])
    )
  })

  describe('the external gateway', () => {
    test('should return data /person/{personId}/summary corresponding to crn for personIdOverride', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: `/person/${config.get('personIdOverride')}/summary`,
        headers: { crn: '1111111100' }
      })
      expect(statusCode).toBe(200)
      expect(result).toConformToSchema(
        schema.paths['/person/{personId}/summary'].get.responses['200'].content['application/json']
          .schema
      )
    })

    test('should return data /person/search', async () => {
      const { result, statusCode } = await server.inject({
        method: 'POST',
        url: '/person/search',
        payload: {
          primarySearchPhrase: '1111111100',
          searchFieldType: 'CUSTOMER_REFERENCE'
        }
      })
      expect(statusCode).toBe(200)
      expect(result._data).toHaveLength(1)
      expect(statusCode).toBe(200)
      expect(result).toConformToSchema(
        schema.paths['/person/search'].post.responses['200'].content['application/json'].schema
      )
    })
  })

  describe('with static person data overrides', () => {
    const staticPersonFixture = {
      // fake generated data
      dateOfBirth: 1065270380449,
      doNotContact: false,
      id: 11111119,
      // static overridden data
      customerReferenceNumber: '1111111900',
      firstName: 'Big',
      middleName: null,
      lastName: 'Skeleton',
      address: {
        address1: 'A dark dark cellar',
        address2: 'A dark dark staircase',
        address3: 'A dark dark house',
        street: 'A dark dark street',
        city: 'A dark dark town',
        dependentLocality: 'A dark dark hill'
      },
      email: 'skeleton@the-closet.net',
      emailValidated: true,
      confirmed: true,
      mobile: null,
      title: null,
      otherTitle: null
    }

    test('should return data /person/{personId}/summary', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/person/11111119/summary'
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toEqual(expect.objectContaining(staticPersonFixture))
    })

    test('should return data /person/search', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/person/search',
        payload: {
          primarySearchPhrase: '1111111900',
          searchFieldType: 'CUSTOMER_REFERENCE'
        }
      })
      expect(response.statusCode).toBe(200)
      const json = JSON.parse(response.payload)
      expect(json._data).toHaveLength(1)
      expect(json._data[0]).toEqual(
        expect.objectContaining({
          customerReference: '1111111900',
          email: 'skeleton@the-closet.net',
          fullName: 'Big Skeleton',
          id: 11111119,
          nationalInsuranceNumber: null,
          primaryAddress: staticPersonFixture.address
        })
      )
    })
  })

  describe('person mutations', () => {
    test('should update person data', async () => {
      // get the current state
      const { result: personFixture } = await server.inject({
        method: 'GET',
        url: '/person/11111111/summary'
      })

      const payload = {
        id: 11111111,
        title: 'test-title',
        otherTitle: 'test-other-title',
        firstName: 'test-first-name',
        middleName: 'test-middle-name',
        lastName: 'test-last-name',
        dateOfBirth: -2,
        landline: '01234 567890',
        mobile: '07111 222333',
        email: 'test-email@test.com',
        doNotContact: !personFixture._data.doNotContact,
        emailValidated: !personFixture._data.emailValidated,
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
          postalCode: 'TE5 5TT',
          street: 'test-street',
          uprn: 'test-uprn'
        },
        locked: !personFixture._data.locked,
        confirmed: !personFixture._data.confirmed,
        customerReferenceNumber: 'test-crn',
        personalIdentifiers: ['not', 'set'],
        deactivated: !personFixture._data.deactivated
      }
      // update the state
      const response = await server.inject({
        method: 'PUT',
        url: '/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: {
          ...payload,
          address: { ...payload.address, extra: 'chuff' },
          more: 'jazz'
        }
      })
      expect(response.statusCode).toBe(204)
      expect(response.payload).toBe('')

      // get the new state
      const updated = await server.inject({
        method: 'GET',
        url: '/person/11111111/summary'
      })
      expect(updated.statusCode).toBe(200)
      expect(updated.result._data).toEqual({
        ...payload,
        dateOfBirth: -2,
        // data which should not be updated remains the same
        customerReferenceNumber: personFixture._data.customerReferenceNumber,
        // the email address changed, so the PartyDigitalContact must be re-verified
        emailValidated: false,
        confirmed: personFixture._data.confirmed,
        locked: personFixture._data.locked,
        deactivated: personFixture._data.deactivated,
        personalIdentifiers: personFixture._data.personalIdentifiers
      })
    })

    test('should fail if no data PUT /person/{personId}', async () => {
      const { result, statusCode } = await server.inject({
        method: 'PUT',
        url: '/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: {}
      })

      expect(statusCode).toBe(422)
      expect(result).toEqual({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: 'validation error while processing input'
      })
    })

    test('should fail if dateOfBirth is in the future PUT /person/{personId}', async () => {
      const { result: current } = await server.inject({
        method: 'GET',
        url: '/person/11111111/summary'
      })

      const { result, statusCode } = await server.inject({
        method: 'PUT',
        url: '/person/11111111',
        headers: {
          email: 'test@defra.gov.uk'
        },
        payload: { ...current._data, dateOfBirth: Date.now() + 86400000 }
      })

      expect(statusCode).toBe(422)
      expect(result).toEqual({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: 'validation error while processing input'
      })
    })
    test('should invalidate emailValidated when the email address changes on PUT /person/{personId}', async () => {
      const { result: current } = await server.inject({
        method: 'GET',
        url: '/person/11111113/summary'
      })
      expect(current._data.email).not.toBe('changed@defra.gov.uk')

      const response = await server.inject({
        method: 'PUT',
        url: '/person/11111113',
        headers: { email: 'test@defra.gov.uk' },
        payload: { ...current._data, email: 'changed@defra.gov.uk' }
      })
      expect(response.statusCode).toBe(204)

      const { result: updated } = await server.inject({
        method: 'GET',
        url: '/person/11111113/summary'
      })
      expect(updated._data.email).toBe('changed@defra.gov.uk')
      expect(updated._data.emailValidated).toBe(false)
    })

    test('should leave emailValidated untouched on PUT /person/{personId} when the email address is unchanged', async () => {
      const { result: current } = await server.inject({
        method: 'GET',
        url: '/person/11111114/summary'
      })

      const response = await server.inject({
        method: 'PUT',
        url: '/person/11111114',
        headers: { email: 'test@defra.gov.uk' },
        payload: { ...current._data, doNotContact: !current._data.doNotContact }
      })
      expect(response.statusCode).toBe(204)

      const { result: updated } = await server.inject({
        method: 'GET',
        url: '/person/11111114/summary'
      })
      expect(updated._data.email).toBe(current._data.email)
      expect(updated._data.emailValidated).toBe(current._data.emailValidated)
    })

    test('should leave emailValidated untouched on PUT /person/{personId} when only the email casing changes', async () => {
      const { result: current } = await server.inject({
        method: 'GET',
        url: '/person/11111115/summary'
      })
      const recasedEmail =
        current._data.email[0].toUpperCase() + current._data.email.slice(1).toLowerCase()

      const response = await server.inject({
        method: 'PUT',
        url: '/person/11111115',
        headers: { email: 'test@defra.gov.uk' },
        payload: { ...current._data, email: recasedEmail }
      })
      expect(response.statusCode).toBe(204)

      const { result: updated } = await server.inject({
        method: 'GET',
        url: '/person/11111115/summary'
      })
      expect(updated._data.email).toBe(recasedEmail)
      expect(updated._data.emailValidated).toBe(current._data.emailValidated)
    })

    test.each([
      [1735689600, 1735689600, 'positive number'],
      [-1735689600, -1735689600, 'negative number'],
      ['1735689600', 1735689600, 'positive string'],
      ['-1735689600', -1735689600, 'negative string']
    ])(
      'should store dateOfBirth as milliseconds without conversion on PUT (%s)',
      async (input, expected) => {
        // fetch current state so we send a complete valid payload
        const { result: current } = await server.inject({
          method: 'GET',
          url: '/person/11111111/summary'
        })

        const putResponse = await server.inject({
          method: 'PUT',
          url: '/person/11111111',
          headers: { email: 'test@defra.gov.uk' },
          payload: { ...current._data, dateOfBirth: input }
        })
        expect(putResponse.statusCode).toBe(204)

        const getResponse = await server.inject({
          method: 'GET',
          url: '/person/11111111/summary'
        })
        expect(getResponse.statusCode).toBe(200)
        expect(getResponse.result._data.dateOfBirth).toBe(expected)
      }
    )
  })
})
