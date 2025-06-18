import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import merge from 'lodash.merge'
import { orgIdToSbi } from '../../factories/id-lookups.js'

const organisations = {}

const createOrganisation = (orgId) => {
  const sbi = orgIdToSbi[orgId]
  faker.seed(orgId)
  const org = {
    id: parseInt(orgId),
    name: faker.company.name(),
    sbi: sbi,
    confirmed: false,
    deactivated: false,
    locked: false,
    address: {
      address1: faker.location.buildingNumber(),
      address2: faker.location.streetAddress(),
      address3: faker.location.city(),
      address4: faker.location.zipCode('??# #??'),
      address5: faker.location.country(),
      pafOrganisationName: null,
      flatName: null,
      buildingNumberRange: null,
      buildingName: null,
      street: null,
      city: faker.location.city(),
      county: null,
      postalCode: faker.location.zipCode(),
      country: 'United Kingdom',
      uprn: faker.string.numeric(12),
      dependentLocality: null,
      doubleDependentLocality: null,
      addressTypeId: null
    },
    email: faker.internet.email(),
    emailValidated: false,
    doNotContact: false,
    landline: faker.phone.number(),
    mobile: null,
    fax: null,
    businessType: {
      id: faker.number.int({ min: 164946, max: 964946 }),
      type: 'Not Specified'
    },
    businessReference: faker.string.numeric(10),
    legalStatus: {
      id: faker.number.int({ min: 164946, max: 964946 }),
      type: 'Sole Proprietorship'
    },
    companiesHouseRegistrationNumber: null,
    charityCommissionRegistrationNumber: null
  }

  organisations[orgId] = org

  return org
}

export const updateOrganisation = (orgId, updatesToOrg) => {
  let org
  if (organisations[orgId]) {
    org = organisations[orgId]
  } else if (!orgIdToSbi[orgId]) {
    throw Boom.notFound('Organisation not found')
  } else {
    org = createOrganisation(orgId)
  }
  const newOrg = merge({}, org, updatesToOrg)
  organisations[orgId] = newOrg
  return newOrg
}

export const retrieveOrganisation = (orgId) => {
  if (organisations[orgId]) {
    return organisations[orgId]
  } else if (!orgIdToSbi[orgId]) {
    throw Boom.notFound('Organisation not found')
  }

  return createOrganisation(orgId)
}
