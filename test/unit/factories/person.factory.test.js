import {
  createPerson,
  retrievePerson,
  searchPeople
} from '../../../src/factories/person/person.factory.js'
import {
  crnToPersonId,
  personIdToOrgIds,
  staticPersonData
} from '../../../src/factories/id-lookups.js'

describe('person.factory', () => {
  describe('createPerson', () => {
    it('allocates a person ID and CRN that do not collide with static lookup data', () => {
      const person = createPerson()
      const staticCrns = Object.values(staticPersonData).map(({ crn }) => crn)

      expect(staticPersonData).not.toHaveProperty(`${person.id}`)
      expect(staticCrns).not.toContain(person.customerReferenceNumber)
    })

    it('allocates distinct IDs and CRNs for each person', () => {
      const first = createPerson()
      const second = createPerson()

      expect(second.id).not.toBe(first.id)
      expect(second.customerReferenceNumber).not.toBe(first.customerReferenceNumber)
    })

    it('keeps generated identifiers while applying the supplied person details', () => {
      const person = createPerson({
        id: 1,
        customerReferenceNumber: '0000000001',
        firstName: 'New',
        lastName: 'Person'
      })

      expect(person).toEqual(
        expect.objectContaining({
          firstName: 'New',
          lastName: 'Person',
          id: expect.any(Number),
          customerReferenceNumber: expect.stringMatching(/^\d{10}$/)
        })
      )
      expect(person.id).not.toBe(1)
      expect(person.customerReferenceNumber).not.toBe('0000000001')
    })

    it('indexes the created person for retrieval, CRN searches, and organisation links', () => {
      const person = createPerson()

      expect(retrievePerson(person.id)).toBe(person)
      expect(crnToPersonId[person.customerReferenceNumber]).toBe(`${person.id}`)
      expect(searchPeople('CUSTOMER_REFERENCE', person.customerReferenceNumber)).toEqual([person])
      expect(personIdToOrgIds[person.id]).toEqual([])
    })
  })
})
