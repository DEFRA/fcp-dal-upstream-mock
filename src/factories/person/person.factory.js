import Boom from '@hapi/boom'
import { personUpdateSchema } from '../../common/update-schemas.js'
import { orgIdToSbi, personIdToCRN, personIdToOrgIds } from '../../factories/id-lookups.js'
import { applyUpdates } from '../../utils/applyUpdates.js'
import { fakeAddress, fakeIds, faker, safeSeed } from '../common.js'
import { retrieveOrganisation } from '../organisation/organisation.factory.js'

const people = {}

const generatePerson = (personId, crn) => {
  personId = safeSeed(personId)
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const person = {
    id: personId,
    title: faker.person.prefix(),
    otherTitle: faker.person.suffix(),
    firstName,
    middleName: faker.person.firstName(),
    lastName: lastName,
    dateOfBirth: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }).getTime(),
    landline: faker.phone.number(),
    mobile: faker.phone.number(),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.internet.domainName()}`,
    doNotContact: faker.datatype.boolean(),
    emailValidated: faker.datatype.boolean(),
    address: fakeAddress(),
    locked: faker.datatype.boolean(),
    confirmed: faker.datatype.boolean(),
    customerReferenceNumber: crn,
    personalIdentifiers: fakeIds(faker.number.int({ min: 0, max: 3 })).map((id) => `${id}`),
    deactivated: faker.datatype.boolean(),
    role: 'Business Partner',
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
    lastUpdatedOn: faker.date.recent().getTime()
  }

  people[personId] = person

  return person
}

Object.entries(personIdToCRN).forEach(([personId, crn]) => {
  people[personId] = generatePerson(personId, crn)
})

export const retrievePerson = (personId) => {
  const person = people[personId]
  const crn = personIdToCRN[personId]
  if (person) {
    return person
  }
  if (!crn) {
    throw Boom.notFound(`person with personId ${personId} not found`)
  }

  return generatePerson(personId, crn)
}

export const retrievePersonOrgs = (personId) => {
  const orgIds = personIdToOrgIds[personId] || []
  const orgs = orgIds.map((orgId) => {
    const org = retrieveOrganisation(orgId)
    return {
      id: orgId,
      sbi: orgIdToSbi[orgId],
      name: org.name,
      additionalSbiIds: org.additionalSbiIds,
      confirmed: org.confirmed,
      lastUpdatedOn: org.lastUpdatedOn,
      landConfirmed: org.landConfirmed,
      deactivated: org.deactivated,
      locked: org.locked
    }
  })
  return orgs
}

export const updatePerson = (personId, updatesToPerson) => {
  const person = retrievePerson(personId)

  return (people[personId] = applyUpdates(personUpdateSchema, person, updatesToPerson))
}
