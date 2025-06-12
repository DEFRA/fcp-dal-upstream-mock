import { fakerEN_GB as faker } from '@faker-js/faker'

export const fakeId = () => `${faker.number.int({ min: 100_000_000, max: 9_999_999_999 })}`
export const fakeIds = (count) => Array.from({ length: count }, fakeId)

export const createPerson = (id, crn) => {
  faker.seed(id)
  const person = {
    id,
    title: faker.person.prefix(),
    otherTitle: faker.person.suffix(),
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date
      .birthdate({ min: 18, max: 90, mode: 'age' })
      .toISOString()
      .substring(0, 10),
    landline: faker.phone.number(),
    mobile: faker.phone.number(),
    email: faker.internet.email(),
    doNotContact: faker.datatype.boolean(),
    emailValidated: faker.datatype.boolean(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      county: faker.location.county(),
      postcode: faker.location.zipCode(),
      country: faker.helpers.weightedArrayElement([
        { weight: 7, value: 'England' },
        { weight: 3, value: 'Scotland' },
        { weight: 2, value: 'Wales' }
      ])
    },
    locked: faker.datatype.boolean(),
    confirmed: faker.datatype.boolean(),
    customerReferenceNumber: crn,
    personalIdentifiers: fakeIds(faker.number.int({ min: 0, max: 3 })),
    deactivated: faker.datatype.boolean()
  }

  return person
}
