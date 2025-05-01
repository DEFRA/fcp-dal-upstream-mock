import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const organisationCPHInfo = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/cph-info.json`)
}

export const organisationCPH = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/cph.json`)
}
