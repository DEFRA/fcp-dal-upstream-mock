import { fakerEN_GB as faker } from '@faker-js/faker'

// set default ref date to 2025-01-01 to ensure consistent dates using faker.seed
// https://fakerjs.dev/api/faker#setdefaultrefdate:~:text=faker.setDefaultRefDate()%3A%20For%20generating%20reproducible%20dates.
faker.setDefaultRefDate(new Date('2025-01-01'))

export const fakeAddress = (overrides = {}) => ({
  address1: faker.location.buildingNumber(),
  address2: faker.location.streetAddress(),
  address3: faker.location.city(),
  address4: faker.location.zipCode('??# #??'),
  address5: faker.location.country(),
  pafOrganisationName: null,
  flatName: null,
  buildingNumberRange: null,
  buildingName: null,
  street: null,
  city: faker.location.city(),
  county: null,
  postalCode: faker.location.zipCode(),
  country: faker.helpers.weightedArrayElement([
    { weight: 7, value: 'England' },
    { weight: 1, value: 'Northern Ireland' },
    { weight: 3, value: 'Scotland' },
    { weight: 2, value: 'Wales' }
  ]),
  uprn: faker.string.numeric(12),
  dependentLocality: null,
  doubleDependentLocality: null,
  addressTypeId: null,
  ...overrides
})

export const fakeId = () => `${faker.number.int({ min: 100_000_000, max: 9_999_999_999 })}`
export const fakeIds = (count) => Array.from({ length: count }, fakeId)

export const nft = (...weights) =>
  faker.helpers.weightedArrayElement([
    { weight: weights[0] || 3, value: null },
    { weight: weights[0] || 2, value: false },
    { weight: weights[0] || 5, value: true }
  ])
export const nullOrFake = (fakeFn, nullWeight = 0.5) =>
  faker.datatype.boolean(nullWeight) ? null : fakeFn()

export const transformDate = (date) => date.toISOString().replace('.', ':') // replicate kits date format
