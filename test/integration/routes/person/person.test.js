import Hapi from '@hapi/hapi'
import { person } from '../../../../src/routes/v2/person.js'

describe('Fake Person', () => {
  let server
  beforeAll(async () => {
    server = Hapi.server()
    server.route(person)
    await server.initialize()
  })

  it('should fetch the same person with ID or CRN', async () => {
    const id = 1000009
    const firstPerson = (
      await server.inject({
        method: 'GET',
        url: `/v2/person/${id}/summary`
      })
    ).result._data
    expect(firstPerson.id).toBe(id)

    const samePerson = (
      await server.inject({
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        url: '/v2/person/search',
        payload: {
          searchFieldType: 'crn',
          primarySearchPhrase: firstPerson.customerReferenceNumber
        }
      })
    ).result._data
    expect(samePerson).toEqual([firstPerson])
  })
})
