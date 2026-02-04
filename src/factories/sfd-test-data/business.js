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
  }
}
