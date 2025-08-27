import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import { orgIdToSbi, personIdToCRN, personIdToOrgIds } from '../../factories/id-lookups.js'
import { fakeAddress, fakeIds } from '../common.js'
import { organisations } from '../organisation/organisation.factory.js'

export const people = {}

const generatePerson = (personId, crn) => {
  faker.seed(personId)
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const person = {
    id: parseInt(personId),
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
    lastUpdatedOn: faker.date.recent().getTime(),
    confirmed: true
  }

  people[personId] = person

  return person
}

Object.entries(personIdToCRN).forEach(([personId, crn]) => {
  people[personId] = generatePerson(personId, crn)
})

export const retrievePerson = (personId) => {
  const person = people[personId]
  if (person) {
    return person
  }

  throw Boom.notFound(`person with personId ${personId} not found`)
}

export const retrievePersonOrgs = (personId) => {
  const orgIds = personIdToOrgIds[personId] || []
  const orgs = orgIds.map((orgId) => {
    const org = organisations[orgId]
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
