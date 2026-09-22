import {
  crnToPersonId,
  personIdToOrgIds,
  staticPersonData
} from '../../../src/factories/id-lookups.js'
import {
  createPerson,
  retrievePerson,
  searchPeople
} from '../../../src/factories/person/person.factory.js'

const createAndRetrievePerson = (payload) => retrievePerson(crnToPersonId[createPerson(payload)])

describe('person.factory', () => {
  describe('createPerson', () => {
    it('returns the new CRN as a 10-digit string', () => {
      const crn = createPerson()

      expect(crn).toEqual(expect.stringMatching(/^\d{10}$/))
    })

    it('allocates a person ID and CRN that do not collide with static lookup data', () => {
      const existingIds = Object.keys(staticPersonData)
      const existingCrns = Object.values(staticPersonData).map(({ crn }) => crn)

      const crn = createPerson()
      const personId = crnToPersonId[crn]

      expect(existingIds).not.toContain(personId)
      expect(existingCrns).not.toContain(crn)
      expect(staticPersonData).toHaveProperty(personId)
      expect(staticPersonData[personId].crn).toBe(crn)
    })

    it('allocates distinct IDs and CRNs for each person', () => {
      const first = createAndRetrievePerson()
      const second = createAndRetrievePerson()

      expect(second.id).not.toBe(first.id)
      expect(second.customerReferenceNumber).not.toBe(first.customerReferenceNumber)
    })

    it('keeps generated identifiers while applying the supplied person details', () => {
      const crn = createPerson({
        id: 1,
        customerReferenceNumber: '0000000001',
        firstName: 'New',
        lastName: 'Person'
      })
      const person = retrievePerson(crnToPersonId[crn])

      expect(person).toEqual(
        expect.objectContaining({
          firstName: 'New',
          lastName: 'Person',
          id: Number(crnToPersonId[crn]),
          customerReferenceNumber: crn
        })
      )
      expect(person.id).not.toBe(1)
      expect(person.customerReferenceNumber).not.toBe('0000000001')
    })

    it('coerces payload fields and ignores fields outside the update schema', () => {
      const person = createAndRetrievePerson({
        firstName: 'New',
        lastName: 123,
        privileges: ['Injected']
      })

      expect(person.lastName).toBe('123')
      expect(searchPeople('CUSTOMER_NAME', '123')).toContainEqual(person)
      expect(person.privileges).not.toContain('Injected')
    })

    it('starts every created person unlocked, active, confirmed and with an unvalidated email', () => {
      const people = Array.from({ length: 20 }, () => createAndRetrievePerson())

      people.forEach((person) => {
        expect(person).toEqual(
          expect.objectContaining({
            locked: false,
            deactivated: false,
            emailValidated: false,
            confirmed: true
          })
        )
      })
    })

    it('does not let the payload set the account flags', () => {
      const person = createAndRetrievePerson({
        firstName: 'New',
        lastName: 'Person',
        locked: true,
        deactivated: true,
        emailValidated: true,
        confirmed: false
      })

      expect(person).toEqual(
        expect.objectContaining({
          locked: false,
          deactivated: false,
          emailValidated: false,
          confirmed: true
        })
      )
    })

    it('indexes the created person for retrieval, CRN searches, and organisation links', () => {
      const crn = createPerson()
      const personId = crnToPersonId[crn]
      const person = retrievePerson(personId)

      expect(person.customerReferenceNumber).toBe(crn)
      expect(searchPeople('CUSTOMER_REFERENCE', crn)).toEqual([person])
      expect(personIdToOrgIds[personId]).toEqual([])
    })
  })
})
