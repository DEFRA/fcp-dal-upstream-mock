import { faker } from '@faker-js/faker'
import fs from 'fs'
import { retrieveOrganisation } from '../organisation/organisation.factory'

const parcelsAndCovers = JSON.parse(
  // Generated using scripts/generate_geometries.sh
  fs.readFileSync(new URL('./valid-parcels-with-covers.json', import.meta.url))
)

const land = {}

const generateParcels = (geometries) => {
  return geometries.map(({ parcel }) => {
    const validFrom = faker.date.past().getTime()
    const validTo = validFrom + faker.number.int({ min: 1, max: 3 }) * 24 * 60 * 60 * 1000
    return {
      parcelId: parcel.id,
      sheetId: parcel.properties.sheetId,
      parcelId: parcel.properties.parcelId,
      area: parseFloat(parcel.properties.area),
      pendingDigitisation: faker.datatype.boolean(0.1),
      validFrom,
      validTo
    }
  })
}

const generateCoversSummary = (covers) => {
  // Initialize summary map with required codes and names
  const summaryMap = {
    110: { code: '110', name: 'Arable Land', area: 0 },
    130: { code: '130', name: 'Permanent Grassland', area: 0 },
    140: { code: '140', name: 'Permanent Crops', area: 0 }
  }

  covers.forEach((cover) => {
    const { code, area } = cover.properties
    if (summaryMap[code]) {
      summaryMap[code].area += parseFloat(area)
    }
  })

  // Round areas to 2 decimal places
  return Object.values(summaryMap).map((item) => ({
    ...item,
    area: parseFloat(item.area.toFixed(2))
  }))
}

const createLand = (orgId) => {
  faker.seed(orgId)
  const geometries = faker.helpers.arrayElements(parcelsAndCovers)
  const parcelsDetailsGeo = geometries.map(({ parcel }) => ({ parcel }))
  const parcels = generateParcels(parcelsDetailsGeo)

  let covers = {}
  geometries.forEach(({ parcel, covers: parcelCovers }) => {
    covers[`${parcel.properties.sheetId}${parcel.properties.parcelId}`] = parcelCovers
  })
  const coversSummary = generateCoversSummary(Object.values(covers).flat())

  return {
    parcelsDetailsGeo,
    parcels,
    covers,
    coversSummary
  }
}

const retrieveOrgLand = (orgId) => {
  retrieveOrganisation(orgId) // ensure organisation exists
  if (!land[orgId]) {
    land[orgId] = createLand(orgId)
  }
  return land[orgId]
}

export const retrieveParcels = (orgId) => {
  const { parcels } = retrieveOrgLand(orgId)
  return parcels.map((parcel) => {
    return {
      id: parcel.parcelId,
      sheetId: parcel.sheetId,
      parcelId: parcel.parcelId,
      area: parcel.area,
      pendingDigitisation: parcel.pendingDigitisation
    }
  })
}

export const retrieveParcelDetails = (orgId) => {
  const { parcels } = retrieveOrgLand(orgId)
  return parcels.map((parcel) => {
    return {
      sheetId: parcel.sheetId,
      parcelId: parcel.parcelId,
      validFrom: parcel.validFrom,
      validTo: parcel.validTo
    }
  })
}

export const retrieveCovers = (orgId, sheetId, parcelId) => {
  const { covers: orgCovers } = retrieveOrgLand(orgId)
  // API returns empty array if no covers found even if invalid parcel reference
  const covers = orgCovers[`${sheetId}${parcelId}`] || []
  return {
    type: 'FeatureCollection',
    features: covers
  }
}

export const retrieveCoversSummary = (orgId) => {
  const { coversSummary } = retrieveOrgLand(orgId)
  return coversSummary
}
