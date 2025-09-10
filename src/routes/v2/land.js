import {
  retrieveCovers,
  retrieveCoversSummary,
  retrieveParcelDetails,
  retrieveParcels
} from '../../factories/land/land.factory.js'

export const land = [
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcels/historic/{historicDate}',
    handler: async (request, h) => {
      const organisationId = request.params.organisationId
      const parcels = retrieveParcels(organisationId)
      return h.response(parcels)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcel-details/historic/{historicDate}',
    handler: async (request, h) => {
      const organisationId = request.params.organisationId
      const parcelDetails = retrieveParcelDetails(organisationId)
      return h.response(parcelDetails)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers',
    handler: async (request, h) => {
      const { sheetId, parcelId, organisationId } = request.params
      const covers = retrieveCovers(organisationId, sheetId, parcelId)
      return h.response(covers)
    }
  },
  {
    method: 'GET',
    path: '/lms/organisation/{organisationId}/covers-summary/historic/{historicDate}',
    handler: async (request, h) => {
      const { organisationId } = request.params
      const coversSummary = retrieveCoversSummary(organisationId)
      return h.response(coversSummary)
    }
  }
]
