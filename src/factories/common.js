import { fakerEN_GB } from '@faker-js/faker'
import fs from 'node:fs'
import { orgIdLookup } from './id-lookups.js'

export const faker = fakerEN_GB

// set default ref date to 2025-01-01 to ensure consistent dates using faker.seed
// https://fakerjs.dev/api/faker#setdefaultrefdate:~:text=faker.setDefaultRefDate()%3A%20For%20generating%20reproducible%20dates.
faker.setDefaultRefDate(new Date('2025-01-01'))

const intOrValue = (value) => {
  const integer = Number.parseInt(value, 10)
  return Number.isNaN(integer) ? value : integer
}
export const safeSeed = (seed) => {
  if (Array.isArray(seed)) {
    return faker.seed(seed.map((s) => intOrValue(s)))
  }
  return faker.seed(intOrValue(seed))
}

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
export const fakeIds = (count, min = 100_000_000, max = 9_999_999_999) =>
  Array.from({ length: count }, () => faker.number.int({ min, max }))

export const nft = (...weights) =>
  faker.helpers.weightedArrayElement([
    { weight: weights[0] || 3, value: null },
    { weight: weights[1] || 2, value: false },
    { weight: weights[2] || 5, value: true }
  ])
export const nullOrFake = (fakeFn, nullWeight = 0.5) =>
  faker.datatype.boolean(nullWeight) ? null : fakeFn()

// replicate non-standard kits date format, e.g. '2019-01-30T12:25:23:023Z'
// NOTE: the seconds:milliseconds separator is a colon `:`, not a dot `.` !!
export const transformDate = (date) => date.toISOString().replace('.', ':')

// replicate non-standard kits date format, e.g. '2019-01-30T12:25:23:023+0000'
// NOTE: the seconds:milliseconds separator is a colon `:`, not a dot `.` !! and the timezone
export const transformTimestamp = (date) => transformDate(date).replace('Z', '+0000')

export const toTitleCase = (str) => str.toLocaleLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

export function generateId(startingId, excludeList) {
  do {
    startingId += 1
  } while (excludeList.includes(startingId))

  return startingId
}

export const pagination = {
  number: 0,
  size: 20,
  totalPages: 1,
  numberOfElements: 1,
  totalElements: 1
}
export const pagination0 = {
  number: 0,
  size: 20,
  totalPages: 1,
  numberOfElements: 0,
  totalElements: 0
}

const validGeometries = JSON.parse(
  // Generated using scripts/generate_geometries.sh
  fs.readFileSync(new URL('./valid-geometries.json', import.meta.url))
)
export const getLandParcels = (
  orgId,
  parcelOverrides = Array.from({ length: faker.number.int({ min: 0, max: 10 }) })
) => {
  if (orgIdLookup[orgId]?.land !== undefined) {
    return orgIdLookup[orgId]?.land?.parcels || []
  }

  const fakeLandParcels = parcelOverrides.map(({ properties, ...rest } = {}) => {
    return {
      id: faker.number.int({ min: 1000000, max: 9999999 }),
      properties: {
        area: faker.number.float({ min: 0, max: 1000000 }),
        pendingDigitisation: faker.datatype.boolean(0.1),
        sheetId: faker.string.alpha({ length: 6 }).toUpperCase(),
        parcelId: faker.string.numeric({ length: 4 }),
        ...(properties ?? {})
      },
      uses: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(() => ({
        lu_code: faker.string.alpha({ length: 5 }).toUpperCase()
      })),
      geometry: faker.helpers.arrayElement(validGeometries),
      covers: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(() => ({
        id: faker.number.int({ min: 1000000, max: 9999999 }),
        properties: {
          area: faker.number.float({ min: 0, max: 1000000 }),
          code: faker.string.numeric({ length: 3 }),
          name: faker.lorem.word(),
          isBpsEligible: faker.datatype.boolean(0.1)
        },
        type: 'Feature',
        geometry: faker.helpers.arrayElement(validGeometries)
      })),
      ...(rest ?? {})
    }
  })

  return fakeLandParcels
}

export const getLandCovers = (
  orgId,
  coverOverrides = Array.from({ length: faker.number.int({ min: 0, max: 10 }) })
) => {
  if (orgIdLookup[orgId]?.land?.covers !== undefined) {
    return orgIdLookup[orgId]?.land?.covers
  }

  const fakeLandCovers = coverOverrides.map((coverOverride = {}, index) => ({
    id: faker.number.int({ min: 1000000, max: 9999999 }),
    properties: {
      area: faker.number.float({ min: 0, max: 1000000 }),
      code: faker.string.numeric({ length: 3 }),
      name: faker.lorem.word(),
      isBpsEligible: faker.datatype.boolean(0.1)
    },
    type: 'Feature',
    geometry: faker.helpers.arrayElement(validGeometries),
    ...coverOverride
  }))

  return fakeLandCovers
}
