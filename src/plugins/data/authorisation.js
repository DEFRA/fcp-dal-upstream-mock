import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const sitiAgriAuthorisationOrganisation = (attributes = {}) => {
  return loadFromFixtures(
    `./orgId/${attributes.organisationId}/siti-agri-authorisation-organisation.json`
  )
}
