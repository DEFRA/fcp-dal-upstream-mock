export { sfdBusinessLookup } from '../sfd-test-data.js'

// TODO: Update this to the manual address object
// Business details override schema (shallow overrides, use any subset of these fields):
// If you override address/correspondenceAddress, provide the full object.
// {
//   name: string,
//   landline: string | null,
//   mobile: string | null,
//   email: string | null,
//   address: {
//     address1, address2, address3, address4, address5,
//     pafOrganisationName, flatName, buildingNumberRange, buildingName,
//     street, city, county, postalCode, country, uprn,
//     dependentLocality, doubleDependentLocality, addressTypeId
//   },
//   correspondenceAddress: { ...same shape as address }
// }

// TODO: Change this to the manual address object without the lookup object
const flatAddress = (manual, postcode, country) => ({
  address1: manual?.line1 ?? null,
  address2: manual?.line2 ?? null,
  address3: manual?.line3 ?? null,
  address4: manual?.line4 ?? null,
  address5: manual?.line5 ?? null,
  pafOrganisationName: null,
  flatName: null,
  buildingNumberRange: null,
  buildingName: null,
  street: manual?.line1 ?? null,
  city: manual?.line4 ?? null,
  county: manual?.line5 ?? null,
  postalCode: postcode ?? null,
  country: country ?? null,
  uprn: null,
  dependentLocality: null,
  doubleDependentLocality: null,
  addressTypeId: null
})

export const sfdBusinessDetailsLookup = {
  3001458: {
    name: 'Example Farming Ltd',
    email: 'hello@examplefarming.test',
    landline: '01234 567890',
    address: {
      address1: '1 Test Farm',
      address2: null,
      address3: null,
      address4: null,
      address5: null,
      pafOrganisationName: 'Example Farming Ltd',
      flatName: null,
      buildingNumberRange: null,
      buildingName: null,
      street: 'Field Lane',
      city: 'Testville',
      county: 'Testshire',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null,
      dependentLocality: null,
      doubleDependentLocality: null,
      addressTypeId: null
    }
  },
  // Business details test user (CRN 3009000000) — orgs 3009000–3009007, flat shape for staticBusinessData overlay
  3009000: {
    name: 'Clean Business Ltd',
    email: 'contact@cleanbusiness.example.com',
    landline: '01234567890',
    mobile: '07123456789',
    address: flatAddress(
      { line1: '10 Valid Street', line2: 'Unit A', line3: '', line4: 'Test Town', line5: 'Testshire' },
      'AB1 2CD',
      'United Kingdom'
    )
  },
  // Business name too short (3009001) — use '' not null so downstream don't 500
  3009001: {
    name: '',
    email: 'name@test.example.com',
    landline: '01234123456',
    mobile: null,
    address: flatAddress(
      { line1: '1 Name Lane', line2: '', line3: '', line4: 'Town', line5: '' },
      'XY9 9ZZ',
      'United Kingdom'
    )
  },
  3009002: {
    name: 'Email Test Farm',
    email: 'not-an-email',
    landline: '01234987654',
    mobile: null,
    address: flatAddress(
      { line1: '2 Email Road', line2: '', line3: '', line4: 'City', line5: '' },
      'CD3 4EF',
      'United Kingdom'
    )
  },
  3009003: {
    name: 'No Phone Co',
    email: 'office@nophone.example.com',
    landline: null,
    mobile: null,
    address: flatAddress(
      { line1: '3 Phone Close', line2: '', line3: '', line4: 'Village', line5: '' },
      'GH6 7IJ',
      'United Kingdom'
    )
  },
  3009004: {
    name: 'Bad Address Ltd',
    email: 'addr@test.example.com',
    landline: '01234567890',
    mobile: null,
    address: flatAddress(
      { line1: '', line2: 'Back entrance', line3: '', line4: 'Town', line5: '' },
      'KL8 9MN',
      'United Kingdom'
    )
  },
  3009005: {
    name: 'No Postcode Farm',
    email: 'post@test.example.com',
    landline: '01234567890',
    mobile: null,
    address: flatAddress(
      { line1: '5 No Postcode Way', line2: '', line3: '', line4: 'Somewhere', line5: '' },
      '',
      'United Kingdom'
    )
  },
  3009006: {
    name: 'Short Phone Ltd',
    email: 'short@test.example.com',
    landline: '123',
    mobile: null,
    address: flatAddress(
      { line1: '6 Short Lane', line2: '', line3: '', line4: 'Town', line5: '' },
      'OP1 2QR',
      'United Kingdom'
    )
  },
  3009007: {
    name: 'Long Phone Ltd',
    email: 'long@test.example.com',
    landline: '012345678901234567890123456789012345678901234567890',
    mobile: null,
    address: flatAddress(
      { line1: '7 Long Street', line2: '', line3: '', line4: 'City', line5: '' },
      'ST3 4UV',
      'United Kingdom'
    )
  }
}
