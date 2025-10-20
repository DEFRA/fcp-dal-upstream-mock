import Boom from '@hapi/boom'
import { crnToPersonId } from '../../factories/id-lookups.js'
import { faker, nullOrFake, safeSeed } from '../common.js'

const authenticateData = {}

const createAuthenticateData = (crn) => {
  const data = nullOrFake(
    () => ({
      customerReference: crn,
      memorableDate: faker.date.past().toLocaleDateString(),
      memorableEvent: faker.lorem.word({ length: { min: 5, max: 10 } }),
      memorableLocation: faker.location.city(),
      lastUpdatedOn: faker.date.recent().toISOString()
    }),
    0.3
  ) ?? {
    customerReference: crn,
    memorableDate: null,
    memorableEvent: null,
    memorableLocation: null,
    lastUpdatedOn: null
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
    safeSeed(personId) // Ensure consistent data for the same person
    return nullOrFake(() => createAuthenticateData(crnToPersonId[crn]))
  }

  throw Boom.notFound(`person with CRN ${crn} not found`)
}
