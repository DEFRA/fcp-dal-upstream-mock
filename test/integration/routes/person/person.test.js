import Hapi from '@hapi/hapi'
import { person } from '../../../../src/routes/v2/person.js'
import { loadSchema } from '../../../helpers.js'

describe('Fake Person', () => {
  let server, schema
  beforeAll(async () => {
    server = Hapi.server()
    server.route(person)
    await Promise.all([
      server.initialize(),
      loadSchema('src/routes/v2/person-schema.oas.yml').then((s) => (schema = s))
    ])
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
})
