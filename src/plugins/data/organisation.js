import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const organisationByOrgId = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/organisation.json`)
}

export const organisationPeopleByOrgId = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/organisation-people.json`)
}

export const organisationBySbi = (sbi) => {
  return loadFromFixtures(`./sbi/${sbi}/organisation-search.json`)
}

export const organisationApplicationsByOrgId = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/organisation-applications.json`)
}

export const organisationPersonSummary = (personId) => {
  return loadFromFixtures(`./personId/${personId}/organisationSummary.json`)
}
