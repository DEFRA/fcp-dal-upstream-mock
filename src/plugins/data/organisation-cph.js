import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const organisationCPHInfo = (orgId, cphNumber) => {
  const info = loadFromFixtures(`./orgId/${orgId}/cph-info.json`)
  if (info) info.data.cphNumber = cphNumber // deliberately ugly hack, use the info file as a seed
  return info
}

export const organisationCPH = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/cph.json`)
}

export const organisationCPHBySbi = (sbi) => {
  return loadFromFixtures(`./sbi/${sbi}/cph.json`)
}
