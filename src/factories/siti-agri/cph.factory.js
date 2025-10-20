import { faker, nullOrFake, safeSeed, transformTimestamp } from '../common.js'
import { orgIdLookup } from '../id-lookups.js'
import { parishes } from './parishes.js'

const maxDate = '9999-12-31T00:00:00:000+0000'
const cphNumberPart = (length) => faker.string.numeric({ length, allowLeadingZeros: true })

const generateCHPInfo = (
  sbi,
  override = {},
  refDate = faker.date.past({ years: 5, refDate: '2025-01-01T00:00:00.000Z' })
) => {
  return {
    sbi,
    dt_insert: transformTimestamp(refDate),
    dt_delete: nullOrFake(() => transformTimestamp(faker.date.soon({ refDate }))) ?? maxDate,
    cph_number: `${cphNumberPart(2)}/${cphNumberPart(3)}/${cphNumberPart(4)}`,
    parish: faker.helpers.arrayElement(parishes),
    start_date: `${(nullOrFake(() => faker.date.soon({ days: 50, refDate })) ?? refDate)
      .toISOString()
      .substring(0, 10)}T00:00:00:000+0000`,
    end_date:
      nullOrFake(() => transformTimestamp(faker.date.future({ refDate, years: 10 }))) ?? maxDate,
    species: faker.helpers
      .arrayElements([
        'CATTLE',
        'CAMELIDS',
        'DEER',
        'GOAT(S)',
        'PIG(S)',
        'POULTRY',
        'PIGEONS',
        'SHEEP',
        'OTHER'
      ])
      .join(','),
    address: [
      `${faker.lorem.words({ min: 1, max: 3 })} Farm`,
      faker.location.street(),
      faker.location.city(),
      faker.location.zipCode()
    ]
      .join(', ')
      .toUpperCase(),
    ...(nullOrFake(
      () => ({
        // NOTE: the min/max coordinates cover all of Great Britain (MAGiC maps has no NI coverage!)
        // ...except for "Rockall" (furthest West, but unfindable on MAGiC maps)
        // min easting: 5515   / northing: 5335    (furtherest west/south)
        // max easting: 655654 / northing: 1220301 (furtherest east/north)
        x: faker.number.int({ min: 5515, max: 655654 }),
        y: faker.number.int({ min: 5335, max: 1220301 })
      }),
      0.1
    ) ?? { x: 0, y: 0 }), // the upstream test data sometimes contains 0,0 !
    ...override
  }
}

const cachedCPHs = {}
const generateCHPs = (sbi, overrides) => {
  const cphs = overrides.map(({ refDate, ...cph } = {}) => generateCHPInfo(sbi, cph, refDate))
  cachedCPHs[sbi] = cphs
  return cphs
}

export const retrieveCPHs = (sbi, orgId) => {
  const cphs = cachedCPHs[sbi]
  if (cphs) {
    return cphs
  }

  safeSeed(sbi)
  return generateCHPs(
    sbi,
    orgIdLookup[orgId]?.cphs ?? Array.from({ length: faker.number.int({ min: 0, max: 30 }) })
  )
}
