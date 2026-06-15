import {
  retrieveCovers,
  retrieveCoversSummary,
  retrieveParcelDetails,
  retrieveParcelGeometries,
  retrieveParcels
} from '../../factories/land/land.factory.js'
import Boom from '@hapi/boom'

const extractOrganisationId = (request) => {
  const organisationId = request.params.organisationId
  if (!Number.isInteger(Number(organisationId))) {
    throw Boom.badRequest(`Bad request`)
  }
  return organisationId
}

const extractIncludeGeometries = (request) => {
  const { includeGeometries } = request.query
  if (
    includeGeometries !== undefined &&
    !['true', 'false'].includes(includeGeometries.toLowerCase())
  ) {
    throw Boom.badRequest(`invalid includeGeometries: ${includeGeometries}`)
  }

  return includeGeometries?.toLowerCase() === 'true'
}

export const land = [
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcels/historic/{historicDate}',
    handler: async (request, h) => {
      const organisationId = extractOrganisationId(request)

      const parcels = retrieveParcels(organisationId)
      return h.response(parcels)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcel-details/historic/{historicDate}',
    handler: async (request, h) => {
      const organisationId = extractOrganisationId(request)

      const parcelDetails = retrieveParcelDetails(organisationId)
      return h.response(parcelDetails)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers',
    handler: async (request, h) => {
      const { sheetId, parcelId } = request.params

      const organisationId = extractOrganisationId(request)
      const includeGeometries = extractIncludeGeometries(request)

      const covers = retrieveCovers(organisationId, sheetId, parcelId, includeGeometries)
      return h.response(covers)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/covers-summary/historic/{historicDate}',
    handler: async (request, h) => {
      const organisationId = extractOrganisationId(request)

      const coversSummary = retrieveCoversSummary(organisationId)
      return h.response(coversSummary)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/geometries',
    handler: async (request, h) => {
      const organisationId = extractOrganisationId(request)

      // bbox is required by the upstream API but the mock doesn't spatially filter on
      // it - the generated parcel geometries aren't tied to real-world coordinates, so
      // all of the org's parcel geometries are returned regardless of bbox/historicDate.
      if (!request.query.bbox) {
        throw Boom.badRequest('bbox query parameter must be specified')
      }

      const geometries = retrieveParcelGeometries(organisationId)
      return h.response(geometries)
    }
  }
]
