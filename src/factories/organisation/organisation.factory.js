import { fakerEN_GB as faker } from '@faker-js/faker'
import Boom from '@hapi/boom'
import { orgIdToPersonIds, orgIdToSbi } from '../../factories/id-lookups.js'
import { fakeAddress, fakeIds, nft, nullOrFake } from '../common.js'
import { people } from '../person/person.factory.js'

export const organisations = {}

function generateOrgId() {
  // exclude existing orgIds
  const excludeList = Object.keys(orgIdToSbi)
  let num
  do {
    num = faker.number.int({ min: 1000000, max: 9999999 })
  } while (excludeList.includes(num))

  return num
}

export const createOrganisation = (payload) => {
  const orgId = generateOrgId()
  const name = payload.name
  const org = {
    id: orgId,
    name,
    sbi: payload.sbi,
    additionalSbiIds: [],
    confirmed: true,
    lastUpdatedOn: null,
    landConfirmed: null,
    deactivated: false,
    locked: false,
    address: {
      address1: payload.address?.address1 ?? null,
      address2: payload.address?.address2 ?? null,
      address3: payload.address?.address3 ?? null,
      address4: payload.address?.address4 ?? null,
      address5: payload.address?.address5 ?? null,
      pafOrganisationName: payload.address?.pafOrganisationName ?? null,
      flatName: payload.address?.flatName ?? null,
      buildingNumberRange: payload.address?.buildingNumberRange ?? null,
      buildingName: payload.address?.buildingName ?? null,
      street: payload.address?.street ?? null,
      city: payload.address?.city ?? null,
      county: payload.address?.county ?? null,
      postalCode: payload.address?.postalCode ?? null,
      country: payload.address?.country ?? null,
      uprn: payload.address?.uprn ?? null,
      dependentLocality: payload.address?.dependentLocality ?? null,
      doubleDependentLocality: payload.address?.doubleDependentLocality ?? null,
      addressTypeId: payload.address?.addressTypeId ?? null
    },
    correspondenceAddress: payload.correspondenceAddress
      ? {
          address1: payload.correspondenceAddress?.address1 ?? null,
          address2: payload.correspondenceAddress?.address2 ?? null,
          address3: payload.correspondenceAddress?.address3 ?? null,
          address4: payload.correspondenceAddress?.address4 ?? null,
          address5: payload.correspondenceAddress?.address5 ?? null,
          pafOrganisationName: payload.correspondenceAddress?.pafOrganisationName ?? null,
          flatName: payload.correspondenceAddress?.flatName ?? null,
          buildingNumberRange: payload.correspondenceAddress?.buildingNumberRange ?? null,
          buildingName: payload.correspondenceAddress?.buildingName ?? null,
          street: payload.correspondenceAddress?.street ?? null,
          city: payload.correspondenceAddress?.city ?? null,
          county: payload.correspondenceAddress?.county ?? null,
          postalCode: payload.correspondenceAddress?.postalCode ?? null,
          country: payload.correspondenceAddress?.country ?? null,
          uprn: payload.correspondenceAddress?.uprn ?? null,
          dependentLocality: payload.correspondenceAddress?.dependentLocality ?? null,
          doubleDependentLocality: payload.correspondenceAddress?.doubleDependentLocality ?? null,
          addressTypeId: payload.correspondenceAddress?.addressTypeId ?? null
        }
      : null,
    isFinancialToBusinessAddr: payload.isFinancialToBusinessAddr,
    isCorrespondenceAsBusinessAddr: payload.isCorrespondenceAsBusinessAddr,
    email: payload.email,
    emailValidated: payload.emailValidated,
    landline: payload.landline,
    mobile: payload.mobile,
    fax: null,
    correspondenceEmail: payload.correspondenceEmail,
    correspondenceEmailValidated: payload.correspondenceEmailValidated,
    correspondenceLandline: payload.correspondenceLandline,
    correspondenceMobile: payload.correspondenceMobile,
    correspondenceFax: null,
    taxRegistrationNumber: payload.taxRegistrationNumber,
    businessType: {
      id: payload.businessType.id,
      type: 'Not set'
    },
    businessReference: payload.businessReference,
    legalStatus: {
      id: payload.legalStatus.id,
      type: 'Not set'
    },
    dateStartedFarming: payload.dateStartedFarming,
    companiesHouseRegistrationNumber: payload.companiesHouseRegistrationNumber,
    charityCommissionRegistrationNumber: payload.charityCommissionRegistrationNumber,
    persons: [],
    hasLandInNorthernIreland: payload.hasLandInNorthernIreland,
    hasLandInScotland: payload.hasLandInScotland,
    hasLandInWales: payload.hasLandInWales,
    hasAdditionalBusinessActivities: payload.hasAdditionalBusinessActivities,
    vendorNumber: payload.vendorNumber,
    traderNumber: payload.traderNumber,
    isAccountablePeopleDeclarationCompleted: payload.isAccountablePeopleDeclarationCompleted,
    additionalBusinessActivities: null
  }

  organisations[orgId] = org

  return org
}

const generateOrganisation = (orgId) => {
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

Object.keys(orgIdToSbi).forEach((orgId) => {
  organisations[orgId] = generateOrganisation(orgId)
})

export const updateOrganisation = (orgId, updatesToOrg) => {
  let org
  if (organisations[orgId]) {
    org = organisations[orgId]
  } else if (!orgIdToSbi[orgId]) {
    throw Boom.notFound(`organisation with orgId ${orgId} not found`)
  } else {
    org = generateOrganisation(orgId)
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
    throw Boom.notFound(`organisation with orgId ${orgId} not found`)
  }

  return generateOrganisation(orgId)
}

export const retrieveOrganisationCustomers = (orgId) => {
  const personIds = orgIdToPersonIds[orgId] || []
  const orgPeople = personIds.map((personId) => {
    const person = people[personId]
    return {
      id: personId,
      firstName: person.firstName,
      lastName: person.lastName,
      customerReference: person.customerReference,
      confirmed: person.confirmed,
      lastUpdatedOn: person.lastUpdatedOn,
      role: person.role,
      privileges: person.privileges
    }
  })
  return orgPeople
}
