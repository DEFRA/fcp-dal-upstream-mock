import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import { crnToPersonId } from '../../factories/id-lookups.js'
import { nullOrFake } from '../common.js'

const authenticateData = {}

const createAuthenticateData = (crn) => {
  faker.seed(crn)
  const data = {
    memorableDate: faker.date.past().toLocaleDateString(),
    memorableEvent: faker.lorem.word({ length: { min: 5, max: 10 } }),
    memorableLocation: faker.location.city(),
    lastUpdatedOn: faker.date.recent().toISOString()
  }
  authenticateData[crn] = data

  return data
}

export const retrieveAuthenticateData = (crn) => {
  if (authenticateData[crn]) {
    return authenticateData[crn]
  }

  const personId = crnToPersonId[crn]
  if (personId) {
    faker.seed(personId) // Ensure consistent data for the same person
    return nullOrFake(() => createAuthenticateData(crnToPersonId[crn]))
  }

  throw Boom.notFound(`person with CRN ${crn} not found`)
}
