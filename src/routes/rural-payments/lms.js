import Boom from '@hapi/boom'
import {
  coversSummary,
  landCover,
  landCovers,
  landParcelDates,
  landParcels,
  landParcelsGeometry
} from '../../plugins/data/lms.js'

export const lms = [
  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/land-covers',
    handler: async (request, h) => {
      const data = landCovers(request.params.orgId)

      if (!data) {
        return Boom.notFound('Land covers not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/parcels',
    handler: async (request, h) => {
      const data = landParcels(request.params.orgId)

      if (!data) {
        return Boom.notFound('Parcels not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/covers-summary/historic/{historicDate}',
    handler: async (request, h) => {
      const { orgId, historicDate } = request.params
      const dateFormatRegex = /^\d{2}-[A-Z][a-z]{2}-\d{2}$/

      if (!dateFormatRegex.test(historicDate)) {
        return Boom.badRequest('Invalid date format')
      }

      if (parseInt(historicDate.substring(7, 9)) < 20) {
        return h.response({ message: 'success', data: {} })
      }

      const data = coversSummary(orgId)

      if (!data) {
        return Boom.notFound('Covers summary not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/geometries',
    handler: async (request, h) => {
      const { bbox, historicDate } = request.query

      if (!bbox || !historicDate) {
        return Boom.badRequest('Missing required query parameters')
      }

      if (parseInt(historicDate.substring(4, 8)) < 2020) {
        return h.response({
          message: 'success',
          data: { type: 'FeatureCollection', features: [] }
        })
      }

      const data = landParcelsGeometry(request.params.orgId)

      if (!data) {
        return Boom.notFound('Geometries not found')
      }

      return h.response(data)
    }
  },
  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/parcels/historic/{historicDate}',
    handler: async (request, h) => {
      const { orgId, historicDate } = request.params
      const dateFormatRegex = /^\d{2}-[A-Z][a-z]{2}-\d{2}$/

      if (!dateFormatRegex.test(historicDate)) {
        return Boom.badRequest('Invalid date format')
      }

      if (parseInt(historicDate.substring(7, 9)) < 20) {
        return h.response({ message: 'success', data: [] })
      }

      const data = landParcels(orgId)

      if (!data) {
        return Boom.notFound('Parcels not found')
      }

      return h.response(data)
    }
  },

  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/parcel/sheet-id/{sheetId}/parcel-id/{parcelId}/historic/{historicDate}/land-covers',
    handler: async (request, h) => {
      const { orgId, sheetId, parcelId, historicDate } = request.params
      const dateFormatRegex = /^\d{2}-[A-Z][a-z]{2}-\d{2}$/

      if (!dateFormatRegex.test(historicDate)) {
        return Boom.badRequest('Invalid date format')
      }

      if (parseInt(historicDate.substring(7, 9)) < 20) {
        return h.response({ message: 'success', data: [] })
      }

      const data = landCover(orgId, sheetId, parcelId)

      if (!data) {
        return Boom.notFound('Land covers not found')
      }

      return h.response(data)
    }
  },

  {
    method: 'GET',
    path: '/v1/lms/organisation/{orgId}/parcel-details/historic/{historicDate}',
    handler: async (request, h) => {
      const { orgId, historicDate } = request.params
      const dateFormatRegex = /^\d{2}-[A-Z][a-z]{2}-\d{2}$/

      if (!dateFormatRegex.test(historicDate)) {
        return Boom.badRequest('Invalid date format')
      }

      if (parseInt(historicDate.substring(7, 9)) < 20) {
        return h.response({ message: 'success', data: [] })
      }

      const data = landParcelDates(orgId)

      if (!data) {
        return Boom.notFound('Parcel dates not found')
      }

      return h.response(data)
    }
  }
]
