import { fakerEN_GB as faker } from '@faker-js/faker'

export const createPeople = (attributes = {}) => ({
  id: faker.number.int({ min: 1649461, max: 9649461 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  customerReference: faker.string.numeric(10),
  confirmed: faker.datatype.boolean(),
  lastUpdatedOn: faker.date.anytime().getDate(),
  role: 'Business Partner',
  privileges: [
    'Full permission - business',
    'Amend - land',
    'Amend - entitlement',
    'Submit - bps',
    'SUBMIT - BPS - SA',
    'AMEND - ENTITLEMENT - SA',
    'AMEND - LAND - SA'
  ].filter(() => faker.datatype.boolean()),
  ...attributes
})

export const createPersonSummary = (attributes = {}) => ({
  id: '4309257',
  name: faker.company.name(),
  sbi: parseInt(faker.string.numeric(9)),
  additionalSbiIds: [],
  confirmed: faker.datatype.boolean(),
  lastUpdatedOn: null,
  landConfirmed: null,
  deactivated: faker.datatype.boolean(),
  locked: faker.datatype.boolean(),
  unreadNotificationCount: 3,
  readNotificationCount: 0,
  ...attributes
})
