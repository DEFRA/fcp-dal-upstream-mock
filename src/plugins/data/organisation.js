import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const organisationByOrgId = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/organisation.json`)
}

export const organisationPeopleByOrgId = (orgId, page = 1, size = 3) => {
  const response = loadFromFixtures(`./orgId/${orgId}/organisation-people.json`)
  const end = size * page
  const start = end - size

  // If this organisation is the 'large number of people set' test org, add people by repeatedly duplicating the first one they have
  if (orgId == 9000002) {
    let numberOfPeople = 500
    const personTemplate = JSON.parse(JSON.stringify(response._data[0]))

    for (let i = 0; i < numberOfPeople; i++) {
      personTemplate.id += i
      response._data.push(personTemplate)
    }
  }

  return response
}

export const organisationBySbi = (sbi) => {
  return loadFromFixtures(`./sbi/${sbi}/organisation-search.json`)
}

export const organisationApplicationsByOrgId = (orgId) => {
  return loadFromFixtures(`./orgId/${orgId}/organisation-applications.json`)
}

export const organisationPersonSummary = (personId, page = 1, size = 3) => {
  const response = loadFromFixtures(`./personId/${personId}/organisationSummary.json`)
  const end = size * page
  const start = end - size

  // If this person is the 'large number of organisations set' test person, add orgs by repeatedly duplicating the first one they have
  if (personId == 9000003) {
    let numberOfOrgs = 500
    const orgTemplate = JSON.parse(JSON.stringify(response._data[0]))

    for (let i = 0; i < numberOfOrgs; i++) {
      orgTemplate.id += i
      response._data.push(orgTemplate)
    }
  }

  return response
}
