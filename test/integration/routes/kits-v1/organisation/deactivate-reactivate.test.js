import Hapi from '@hapi/hapi'
import { organisation } from '../../../../../src/routes/kits-v1/organisation.js'

describe('Organisation Deactivate/Reactivate', () => {
  let server
  beforeAll(async () => {
    server = Hapi.server()
    server.route(organisation)
    await server.initialize()
  })

  describe('Deactivate', () => {
    it('should deactivate an organisation if the organisation is in locked state', async () => {
      const organisationId = 9200000
      const { statusCode } = await server.inject({
        method: 'POST',
        url: `/organisation/${organisationId}/deactivate`,
        payload: {
          partyNoteType: 'DeactivateOrganisation',
          reason: 'Business Structure Changes'
        }
      })
      expect(statusCode).toBe(204)
    })
    it('should throw an error when deactivating an organisation if neither reason nor partyNoteType is provided', async () => {
      const organisationId = 100000000
      const { statusCode } = await server.inject({
        method: 'POST',
        url: `/organisation/${organisationId}/deactivate`,
        payload: {
          partyNoteType: 'DeactivateOrganisation',
          reason: '',
          note: ''
        }
      })
      expect(statusCode).toBe(400)
    })

    it('should throw an error when deactivating an organisation if organisationId is invalid', async () => {
      const organisationId = 'invalid-id'
      const { statusCode } = await server.inject({
        method: 'POST',
        url: `/organisation/${organisationId}/deactivate`,
        payload: {
          partyNoteType: 'DeactivateOrganisation',
          reason: 'a reason',
          note: ''
        }
      })
      expect(statusCode).toBe(403)
    })

    it('should throw an error when deactivating an organisation if the organisation is not in locked state', async () => {
      const organisationId = 100000000
      const { statusCode } = await server.inject({
        method: 'POST',
        url: `/organisation/${organisationId}/deactivate`,
        payload: {
          partyNoteType: 'DeactivateOrganisation',
          reason: 'Business Structure Changes'
        }
      })
      expect(statusCode).toBe(500)
    })
  })
})
