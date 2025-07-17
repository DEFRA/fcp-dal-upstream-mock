import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import { orgIdToSbi } from '../../factories/id-lookups.js'
import { fakeAddress, fakeIds, nft, nullOrFake } from '../common.js'

const organisations = {}

const createOrganisation = (orgId) => {
  const sbi = orgIdToSbi[orgId]
  faker.seed(orgId)
  const name = faker.company.name()
  const hasAdditionalBusinessActivities = nft(4, 2, 3)
  const org = {
    id: parseInt(orgId),
    name,
    sbi: sbi,
    additionalSbiIds: [],
    confirmed: faker.datatype.boolean(0.9),
    lastUpdatedOn: faker.date.recent().getTime(),
    landConfirmed: faker.datatype.boolean(0.7),
    deactivated: faker.datatype.boolean(0.2),
    locked: faker.datatype.boolean(0.1),
    address: fakeAddress({ pafOrganisationName: name }),
    correspondenceAddress: nullOrFake(() => fakeAddress({ pafOrganisationName: name }), 0.7),
    isFinancialToBusinessAddr: nft(),
    isCorrespondenceAsBusinessAddr: nft(7, 2, 1),
    email: faker.internet.email(),
    emailValidated: faker.datatype.boolean(0.8),
    landline: faker.phone.number(),
    mobile: faker.phone.number(),
    fax: null,
    correspondenceEmail: faker.internet.email(),
    correspondenceEmailValidated: faker.datatype.boolean(0.8),
    correspondenceLandline: faker.phone.number(),
    correspondenceMobile: faker.phone.number(),
    correspondenceFax: null,
    taxRegistrationNumber: nullOrFake(() => faker.string.numeric(10)),
    businessType: {
      id: faker.number.int({ min: 164946, max: 964946 }),
      type: 'Not Specified'
    },
    businessReference: faker.string.numeric(10),
    legalStatus: {
      id: faker.number.int({ min: 164946, max: 964946 }),
      type: 'Sole Proprietorship'
    },
    dateStartedFarming: faker.date.past().toISOString(),
    companiesHouseRegistrationNumber: nullOrFake(() => faker.string.alphanumeric(8)),
    charityCommissionRegistrationNumber: nullOrFake(() => faker.string.alphanumeric(8)),
    persons: [],
    hasLandInNorthernIreland: nft(4, 2, 1),
    hasLandInScotland: nft(4, 2, 3),
    hasLandInWales: nft(4, 2, 3),
    hasAdditionalBusinessActivities,
    vendorNumber: nullOrFake(() => faker.string.numeric(6)),
    traderNumber: nullOrFake(() => faker.string.numeric(6)),
    isAccountablePeopleDeclarationCompleted: nft(7, 1, 2),
    additionalBusinessActivities: hasAdditionalBusinessActivities
      ? fakeIds(faker.number.int({ min: 1, max: 3 })).map((id, i) => ({
          id: parseInt(id, 10),
          type: `Additional Business Activity ${i}`
        }))
      : null
  }

  organisations[orgId] = org

  return org
}

export const updateOrganisation = (orgId, updatesToOrg) => {
  let org
  if (organisations[orgId]) {
    org = organisations[orgId]
  } else if (!orgIdToSbi[orgId]) {
    throw Boom.notFound('HTTP 404 Not Found')
  } else {
    org = createOrganisation(orgId)
  }
  const newOrg = Object.assign(org, updatesToOrg)
  organisations[orgId] = newOrg
  return newOrg
}

export const retrieveOrganisation = (orgId) => {
  if (organisations[orgId]) {
    return organisations[orgId]
  }
  if (!orgIdToSbi[orgId]) {
    throw Boom.notFound('HTTP 404 Not Found')
  }

  return createOrganisation(orgId)
}
