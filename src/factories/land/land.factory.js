import { Boom } from '@hapi/boom'
import { orgIdToSbi } from '../../factories/id-lookups.js'
import { faker, getLandParcels, safeSeed } from '../common.js'

const land = {}

const generateParcels = (geometries) => {
  return geometries.map(({ parcel }) => {
    const validFrom = faker.date.past({ refDate: new Date('2025-01-01') }).getTime()
    const validTo = validFrom + faker.number.int({ min: 1, max: 3 }) * 24 * 60 * 60 * 1000
    return {
      id: parcel.id,
      sheetId: parcel.properties.sheetId,
      parcelId: parcel.properties.parcelId,
      area: Number.parseFloat(parcel.properties.area),
      pendingDigitisation: faker.datatype.boolean(0.1),
      validFrom,
      validTo
    }
  })
}

const generateCoversSummary = (covers = []) => {
  // Initialize summary map with required codes and names
  const summaryMap = {
    110: { code: '110', name: 'Arable Land', area: 0 },
    130: { code: '130', name: 'Permanent Grassland', area: 0 },
    140: { code: '140', name: 'Permanent Crops', area: 0 }
  }

  covers.forEach(({ properties }) => {
    const { code, area } = properties
    if (summaryMap[code]) {
      summaryMap[code].area += Number.parseFloat(area)
    }
  })

  // Round areas to 2 decimal places
  return Object.values(summaryMap).map((item) => ({
    ...item,
    area: Number.parseFloat(item.area.toFixed(2))
  }))
}

const createLand = (orgId) => {
  safeSeed(orgId)
  const parcelDatas = getLandParcels(orgId)
  const parcelsDetailsGeo = parcelDatas.map((parcel) => ({ parcel }))
  const parcels = generateParcels(parcelsDetailsGeo)
  const covers = parcelDatas.reduce(
    (result, parcel) => ({
      ...result,
      [`${parcel.properties.sheetId}-${parcel.properties.parcelId}`]: parcel.covers ?? []
    }),
    {}
  )
  const coversSummary = generateCoversSummary(Object.values(covers).flat())

  const landData = {
    parcelsDetailsGeo,
    parcels,
    covers,
    coversSummary
  }
  land[orgId] = landData
  return landData
}

const retrieveOrgLand = (orgId) => {
  if (!orgIdToSbi[orgId]) {
    // Don't create land for non-existent orgs
    // But don't throw error as the API generally returns empty arrays
    return {
      parcelsDetailsGeo: [],
      parcels: [],
      covers: [],
      coversSummary: []
    }
  }
  return land[orgId] ?? createLand(orgId)
}

export const retrieveParcels = (orgId) => {
  const { parcels } = retrieveOrgLand(orgId)
  return parcels.map(({ id, sheetId, parcelId, area, pendingDigitisation }) => ({
    id,
    sheetId,
    parcelId,
    area,
    pendingDigitisation
  }))
}

export const retrieveParcelDetails = (orgId) => {
  const { parcels } = retrieveOrgLand(orgId)
  return parcels.map(({ sheetId, parcelId, validTo, validFrom }) => ({
    sheetId,
    parcelId,
    validTo,
    validFrom
  }))
}

export const retrieveCovers = (orgId, sheetId, parcelId) => {
  const { covers: orgCovers } = retrieveOrgLand(orgId)
  // API returns empty array if no covers found even if invalid parcel reference
  const covers = orgCovers[`${sheetId}-${parcelId}`] || []
  return {
    type: 'FeatureCollection',
    features: covers
  }
}

export const retrieveCoversSummary = (orgId) => {
  // Strangely this API does actually throw an error for non-existent orgId
  if (!orgIdToSbi[orgId]) {
    return Boom.internal('Org not found')
  }
  const { coversSummary } = retrieveOrgLand(orgId)
  return coversSummary
}
