import { fakerEN_GB as faker } from '@faker-js/faker'

export const createOrganisation = (attributes = {}) => ({
  id: faker.string.numeric(7),
  name: faker.company.name(),
  sbi: parseInt(faker.string.numeric(9)),
  confirmed: false,
  deactivated: false,
  locked: false,
  address: {
    address1: null,
    address2: null,
    address3: null,
    address4: null,
    address5: null,
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
  charityCommissionRegistrationNumber: null,
  ...attributes
})
