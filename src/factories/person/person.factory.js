import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import { personIdToCRN } from '../../factories/id-lookups.js'
import { fakeAddress, fakeIds } from '../common.js'

const people = {}

const createPerson = (personId) => {
  const crn = personIdToCRN[personId]
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
    personalIdentifiers: fakeIds(faker.number.int({ min: 0, max: 3 })),
    deactivated: faker.datatype.boolean()
  }

  people[personId] = person

  return person
}

export const retrievePerson = (personId) => {
  if (people[personId]) {
    return people[personId]
  }
  if (!personIdToCRN[personId]) {
    throw Boom.notFound(`person with personId ${personId} not found`)
  }

  return createPerson(personId)
}
