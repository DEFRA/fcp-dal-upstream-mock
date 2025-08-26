import { fakerEN_GB as faker } from '@faker-js/faker'

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

export const fakeId = () => faker.number.int({ min: 100_000_000, max: 9_999_999_999 })
export const fakeIds = (count) => Array.from({ length: count }, fakeId)

export const nft = (...weights) =>
  faker.helpers.weightedArrayElement([
    { weight: weights[0] || 3, value: null },
    { weight: weights[1] || 2, value: false },
    { weight: weights[2] || 5, value: true }
  ])
export const nullOrFake = (fakeFn, nullWeight = 0.5) =>
  faker.datatype.boolean(nullWeight) ? null : fakeFn()

// replicate non-standard kits date format, e.g. '2019-01-30T12:25:23:023+0000'
// NOTE: the seconds:milliseconds separator is a colon `:`, not a dot `.` !!
export const transformDate = (date) => date.toISOString().replace('.', ':')

export const toTitleCase = (str) => str.toLocaleLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
