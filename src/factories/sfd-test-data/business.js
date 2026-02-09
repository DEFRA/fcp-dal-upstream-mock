/**
 * sfdBusinessDetailsLookup: orgId -> override object for business details.
 * Entries are merged into staticBusinessData in id-lookups.js and applied as overrides in
 * organisation.factory.js (generateOrganisation(orgId, sbi, staticBusinessData[orgId])).
 * Only include the keys you need; other org fields come from the factory defaults.
 *
 * Example shape for the fields relevant to SFD business details (name, manual address, phones, email):
 *
 * {
 *   name: 'Business Name',
 *   address: {
 *     address1: 'Line 1',
 *     address2: null,
 *     address3: null,
 *     address4: null,
 *     address5: null,
 *     postalCode: 'AB1 2CD',
 *     country: 'United Kingdom',
 *     uprn: null  // Set to null for manual entry / test scenarios (no lookup)
 *   },
 *   landline: '01234567890',
 *   mobile: '07123456789',
 *   email: 'business@example.com'
 * }
 */
export const sfdBusinessDetailsLookup = {
  // Business details test user (CRN 3009000000)
  3009000: {
    name: 'Clean Business Ltd'
  },
  3009002: {
    name: 'No Email',
    email: 'not-an-email'
  },
  3009003: {
    name: 'No Phone',
    landline: null,
    mobile: null
  },
  3009004: {
    name: 'Missing Address',
    address: {
      address1: null,
      address2: null,
      address3: null,
      city: null,
      county: null,
      postalCode: null,
      country: null
    }
  },
  3009005: {
    name: 'No Postcode',
    address: {
      address1: '5 No Postcode Way',
      address2: null,
      address3: null,
      city: 'Somewhere',
      county: null,
      postalCode: null,
      country: 'United Kingdom'
    }
  },
  3009006: {
    name: 'Short Phone',
    landline: '123'
  },
  3009007: {
    name: 'Long Phone',
    landline: '012345678901234567890123456789012345678901234567890'
  }
}

import { sfdBusinessLookupPerformance } from './performance.js'

// All static personal.js test users who use the shared Test Org in defra-id.data.json (org 3001458).
// Excludes 3009100 (Business Details Test has orgs 3009000–3009007).
const sfdBusinessLookupCore = {
  // Defra ID stub "Test User" / shared Test Org (defra-id.data.json) — org 3001458, SBI 300145801
  3001458: {
    sbi: 300145801,
    customers: [
      3000000, 3000001, 3000002, 3000003, 3000004, 3000005, 3000006, 3000007, 3000008, 3000009,
      3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009,
      3010010, 3010011, 3010012, 3010013, 3010014, 3010015, 3010016, 3010017, 3010018, 3010019,
      3010020, 3010021, 3010022, 3010023, 3010024, 3010025, 3010026, 3010027, 3010028, 3010029,
      3010030, 3010031, 3010032, 3010033, 3010034, 3010035, 3010036, 3010037, 3010038, 3010039,
      3001000, 3001001, 3001002, 3001003, 3001004, 3001005, 3001006, 3001007, 3001008, 3001009,
      3002000, 3002100, 3002200, 3002300, 3002400, 3002500, 3002600, 3002700, 3002800, 3002900,
      3010040, 3010041, 3010042, 3010043, 3010044, 3010045, 3010046, 3010047, 3010048, 3010049,
      3010050, 3010051, 3010052, 3010053, 3010054, 3010055, 3010056, 3010057, 3010058, 3010059,
      3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010068, 3010069,
      3010070, 3010071, 3010072, 3010073, 3010074, 3010075, 3010076, 3010077, 3010078, 3010079,
      3004000, 3004100, 3004200, 3004300, 3004400, 3004500, 3004600, 3004700, 3004800, 3004900,
      3010080, 3010081, 3010082, 3010083, 3010084, 3010085, 3010086, 3010087, 3010088, 3010089,
      3010090, 3010091, 3010092, 3010093, 3010094, 3010095, 3010096, 3010097, 3010098, 3010099,
      3003000, 3003100, 3003200, 3003300, 3003400, 3003500, 3003600, 3003700, 3003800, 3003900,
      3005000, 3005100, 3005200, 3005300, 3005400, 3005500, 3005600, 3005700, 3005800, 3005900,
      3006000, 3006100, 3006200, 3006300, 3006400, 3006500, 3006600, 3006700, 3006800, 3006900,
      3007000, 3007100, 3007200, 3007300, 3007400, 3007500, 3007600, 3007700, 3007800, 3007900,
      3008000, 3008100, 3008200, 3008300, 3008400, 3008500, 3008600, 3008700, 3008800, 3008900
    ]
  },
  // Business details test data orgs (3009000–3009007); SBIs 3-prefix 9-digit; CRN 3009000000 (personId 3009100)
  3009000: { sbi: 300900001, customers: [3009100] },
  3009001: { sbi: 300900002, customers: [3009100] },
  3009002: { sbi: 300900003, customers: [3009100] },
  3009003: { sbi: 300900004, customers: [3009100] },
  3009004: { sbi: 300900005, customers: [3009100] },
  3009005: { sbi: 300900006, customers: [3009100] },
  3009006: { sbi: 300900007, customers: [3009100] },
  3009007: { sbi: 300900008, customers: [3009100] },
  80000001: { sbi: 8000000001, customers: [8000001], cphs: [] } // org with no CPH
}

export const sfdBusinessLookup = {
  ...sfdBusinessLookupCore,
  ...sfdBusinessLookupPerformance
}
