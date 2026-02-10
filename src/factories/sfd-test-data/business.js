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
 *
 * Org IDs follow the same numbering/buffer approach as personal.js: 100-org-ID buffer between
 * different scenario types; 10 examples per scenario (or 1 per 100-block for Invalid business phone).
 */
const cleanAddress = {
  address1: '1 Clean Street',
  address2: null,
  address3: null,
  address4: null,
  address5: null,
  city: 'Clean Town',
  county: null,
  postalCode: 'AB1 2CD',
  country: 'United Kingdom',
  uprn: null
}

const minimalValidAddress = {
  address1: '1 Valid Street',
  address2: null,
  address3: null,
  address4: null,
  address5: null,
  city: 'Town',
  county: null,
  postalCode: 'AB1 2CD',
  country: 'United Kingdom',
  uprn: null
}

export const sfdBusinessDetailsLookup = {
  // Clean control (3009000-3009099) - All valid data for comparison
  // 100-org-ID buffer between different scenario types to allow expansion
  // 3009000-3009009: Clean control (10), buffer 3009010-3009099
  3009000: {
    name: 'Clean control - example 1',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009001: {
    name: 'Clean control - example 2',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009002: {
    name: 'Clean control - example 3',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009003: {
    name: 'Clean control - example 4',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009004: {
    name: 'Clean control - example 5',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009005: {
    name: 'Clean control - example 6',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009006: {
    name: 'Clean control - example 7',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009007: {
    name: 'Clean control - example 8',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009008: {
    name: 'Clean control - example 9',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },
  3009009: {
    name: 'Clean control - example 10',
    address: cleanAddress,
    landline: '01234567890',
    mobile: '07123456789',
    email: 'clean.business@example.com'
  },

  // Business name (3009100-3009199) - null/empty + invalid
  // 3009100-3009109: Name empty (10), buffer 3009110-3009199
  // Business name could not be tested as invalid data either breaking DAL or being overwritten by factory defaults.

  // Address (3009300-3010399) - null/empty + invalid, 100-org-ID buffer per scenario type
  // 3009300-3009399: Address line 1 empty (10)
  3009300: { name: 'Address line 1 empty - example 1', address: { ...minimalValidAddress, address1: '' } },
  3009301: { name: 'Address line 1 empty - example 2', address: { ...minimalValidAddress, address1: '' } },
  3009302: { name: 'Address line 1 empty - example 3', address: { ...minimalValidAddress, address1: '' } },
  3009303: { name: 'Address line 1 empty - example 4', address: { ...minimalValidAddress, address1: '' } },
  3009304: { name: 'Address line 1 empty - example 5', address: { ...minimalValidAddress, address1: '' } },
  3009305: { name: 'Address line 1 empty - example 6', address: { ...minimalValidAddress, address1: '' } },
  3009306: { name: 'Address line 1 empty - example 7', address: { ...minimalValidAddress, address1: '' } },
  3009307: { name: 'Address line 1 empty - example 8', address: { ...minimalValidAddress, address1: '' } },
  3009308: { name: 'Address line 1 empty - example 9', address: { ...minimalValidAddress, address1: '' } },
  3009309: { name: 'Address line 1 empty - example 10', address: { ...minimalValidAddress, address1: '' } },

  // 3009400-3009499: Address line 1 too long (10) - ADDRESS_LINE_MAX 100
  3009400: { name: 'Address line 1 too long - example 1', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009401: { name: 'Address line 1 too long - example 2', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009402: { name: 'Address line 1 too long - example 3', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009403: { name: 'Address line 1 too long - example 4', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009404: { name: 'Address line 1 too long - example 5', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009405: { name: 'Address line 1 too long - example 6', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009406: { name: 'Address line 1 too long - example 7', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009407: { name: 'Address line 1 too long - example 8', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009408: { name: 'Address line 1 too long - example 9', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },
  3009409: { name: 'Address line 1 too long - example 10', address: { ...minimalValidAddress, address1: 'A'.repeat(101) } },

  // 3009500-3009599: Address line 2 too long (10)
  3009500: { name: 'Address line 2 too long - example 1', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009501: { name: 'Address line 2 too long - example 2', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009502: { name: 'Address line 2 too long - example 3', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009503: { name: 'Address line 2 too long - example 4', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009504: { name: 'Address line 2 too long - example 5', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009505: { name: 'Address line 2 too long - example 6', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009506: { name: 'Address line 2 too long - example 7', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009507: { name: 'Address line 2 too long - example 8', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009508: { name: 'Address line 2 too long - example 9', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },
  3009509: { name: 'Address line 2 too long - example 10', address: { ...minimalValidAddress, address2: 'A'.repeat(101) } },

  // 3009600-3009699: Address line 3 too long (10)
  3009600: { name: 'Address line 3 too long - example 1', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009601: { name: 'Address line 3 too long - example 2', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009602: { name: 'Address line 3 too long - example 3', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009603: { name: 'Address line 3 too long - example 4', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009604: { name: 'Address line 3 too long - example 5', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009605: { name: 'Address line 3 too long - example 6', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009606: { name: 'Address line 3 too long - example 7', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009607: { name: 'Address line 3 too long - example 8', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009608: { name: 'Address line 3 too long - example 9', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },
  3009609: { name: 'Address line 3 too long - example 10', address: { ...minimalValidAddress, address3: 'A'.repeat(101) } },

  // 3009700-3009799: City empty (10)
  3009700: { name: 'City empty - example 1', address: { ...minimalValidAddress, city: '' } },
  3009701: { name: 'City empty - example 2', address: { ...minimalValidAddress, city: '' } },
  3009702: { name: 'City empty - example 3', address: { ...minimalValidAddress, city: '' } },
  3009703: { name: 'City empty - example 4', address: { ...minimalValidAddress, city: '' } },
  3009704: { name: 'City empty - example 5', address: { ...minimalValidAddress, city: '' } },
  3009705: { name: 'City empty - example 6', address: { ...minimalValidAddress, city: '' } },
  3009706: { name: 'City empty - example 7', address: { ...minimalValidAddress, city: '' } },
  3009707: { name: 'City empty - example 8', address: { ...minimalValidAddress, city: '' } },
  3009708: { name: 'City empty - example 9', address: { ...minimalValidAddress, city: '' } },
  3009709: { name: 'City empty - example 10', address: { ...minimalValidAddress, city: '' } },

  // 3009800-3009899: City too long (10) - TOWN_CITY_MAX 60
  3009800: { name: 'City too long - example 1', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009801: { name: 'City too long - example 2', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009802: { name: 'City too long - example 3', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009803: { name: 'City too long - example 4', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009804: { name: 'City too long - example 5', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009805: { name: 'City too long - example 6', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009806: { name: 'City too long - example 7', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009807: { name: 'City too long - example 8', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009808: { name: 'City too long - example 9', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },
  3009809: { name: 'City too long - example 10', address: { ...minimalValidAddress, city: 'A'.repeat(61) } },

  // 3009900-3009999: County too long (10) - COUNTY_MAX 60
  3009900: { name: 'County too long - example 1', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009901: { name: 'County too long - example 2', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009902: { name: 'County too long - example 3', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009903: { name: 'County too long - example 4', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009904: { name: 'County too long - example 5', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009905: { name: 'County too long - example 6', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009906: { name: 'County too long - example 7', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009907: { name: 'County too long - example 8', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009908: { name: 'County too long - example 9', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },
  3009909: { name: 'County too long - example 10', address: { ...minimalValidAddress, county: 'A'.repeat(61) } },

  // 3010000-3010099: Postcode empty (10)
  3010000: { name: 'Postcode empty - example 1', address: { ...minimalValidAddress, postalCode: '' } },
  3010001: { name: 'Postcode empty - example 2', address: { ...minimalValidAddress, postalCode: '' } },
  3010002: { name: 'Postcode empty - example 3', address: { ...minimalValidAddress, postalCode: '' } },
  3010003: { name: 'Postcode empty - example 4', address: { ...minimalValidAddress, postalCode: '' } },
  3010004: { name: 'Postcode empty - example 5', address: { ...minimalValidAddress, postalCode: '' } },
  3010005: { name: 'Postcode empty - example 6', address: { ...minimalValidAddress, postalCode: '' } },
  3010006: { name: 'Postcode empty - example 7', address: { ...minimalValidAddress, postalCode: '' } },
  3010007: { name: 'Postcode empty - example 8', address: { ...minimalValidAddress, postalCode: '' } },
  3010008: { name: 'Postcode empty - example 9', address: { ...minimalValidAddress, postalCode: '' } },
  3010009: { name: 'Postcode empty - example 10', address: { ...minimalValidAddress, postalCode: '' } },

  // 3010100-3010199: Postcode too long (10) - POSTCODE_MAX 8
  3010100: { name: 'Postcode too long - example 1', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010101: { name: 'Postcode too long - example 2', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010102: { name: 'Postcode too long - example 3', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010103: { name: 'Postcode too long - example 4', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010104: { name: 'Postcode too long - example 5', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010105: { name: 'Postcode too long - example 6', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010106: { name: 'Postcode too long - example 7', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010107: { name: 'Postcode too long - example 8', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010108: { name: 'Postcode too long - example 9', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },
  3010109: { name: 'Postcode too long - example 10', address: { ...minimalValidAddress, postalCode: 'A'.repeat(9) } },

  // 3010200-3010299: Country empty (10)
  3010200: { name: 'Country empty - example 1', address: { ...minimalValidAddress, country: '' } },
  3010201: { name: 'Country empty - example 2', address: { ...minimalValidAddress, country: '' } },
  3010202: { name: 'Country empty - example 3', address: { ...minimalValidAddress, country: '' } },
  3010203: { name: 'Country empty - example 4', address: { ...minimalValidAddress, country: '' } },
  3010204: { name: 'Country empty - example 5', address: { ...minimalValidAddress, country: '' } },
  3010205: { name: 'Country empty - example 6', address: { ...minimalValidAddress, country: '' } },
  3010206: { name: 'Country empty - example 7', address: { ...minimalValidAddress, country: '' } },
  3010207: { name: 'Country empty - example 8', address: { ...minimalValidAddress, country: '' } },
  3010208: { name: 'Country empty - example 9', address: { ...minimalValidAddress, country: '' } },
  3010209: { name: 'Country empty - example 10', address: { ...minimalValidAddress, country: '' } },

  // 3010300-3010399: Country too long (10) - COUNTRY_MAX 60
  3010300: { name: 'Country too long - example 1', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010301: { name: 'Country too long - example 2', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010302: { name: 'Country too long - example 3', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010303: { name: 'Country too long - example 4', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010304: { name: 'Country too long - example 5', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010305: { name: 'Country too long - example 6', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010306: { name: 'Country too long - example 7', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010307: { name: 'Country too long - example 8', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010308: { name: 'Country too long - example 9', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },
  3010309: { name: 'Country too long - example 10', address: { ...minimalValidAddress, country: 'A'.repeat(61) } },

  // Phone (3010400-3010899) - both null + length invalid
  // 3010400-3010499: Both phones null (10)
  3010400: { name: 'Both phones null - example 1', landline: null, mobile: null },
  3010401: { name: 'Both phones null - example 2', landline: null, mobile: null },
  3010402: { name: 'Both phones null - example 3', landline: null, mobile: null },
  3010403: { name: 'Both phones null - example 4', landline: null, mobile: null },
  3010404: { name: 'Both phones null - example 5', landline: null, mobile: null },
  3010405: { name: 'Both phones null - example 6', landline: null, mobile: null },
  3010406: { name: 'Both phones null - example 7', landline: null, mobile: null },
  3010407: { name: 'Both phones null - example 8', landline: null, mobile: null },
  3010408: { name: 'Both phones null - example 9', landline: null, mobile: null },
  3010409: { name: 'Both phones null - example 10', landline: null, mobile: null },

  // 3010500-3010599: Landline too short (10) - PHONE_NUMBER_MIN 10
  3010500: { name: 'Landline too short - example 1', landline: '123' },
  3010501: { name: 'Landline too short - example 2', landline: '123' },
  3010502: { name: 'Landline too short - example 3', landline: '123' },
  3010503: { name: 'Landline too short - example 4', landline: '123' },
  3010504: { name: 'Landline too short - example 5', landline: '123' },
  3010505: { name: 'Landline too short - example 6', landline: '123' },
  3010506: { name: 'Landline too short - example 7', landline: '123' },
  3010507: { name: 'Landline too short - example 8', landline: '123' },
  3010508: { name: 'Landline too short - example 9', landline: '123' },
  3010509: { name: 'Landline too short - example 10', landline: '123' },

  // 3010600-3010699: Landline too long (10) - PHONE_NUMBER_MAX 50
  3010600: { name: 'Landline too long - example 1', landline: '012345678901234567890123456789012345678901234567890' },
  3010601: { name: 'Landline too long - example 2', landline: '012345678901234567890123456789012345678901234567890' },
  3010602: { name: 'Landline too long - example 3', landline: '012345678901234567890123456789012345678901234567890' },
  3010603: { name: 'Landline too long - example 4', landline: '012345678901234567890123456789012345678901234567890' },
  3010604: { name: 'Landline too long - example 5', landline: '012345678901234567890123456789012345678901234567890' },
  3010605: { name: 'Landline too long - example 6', landline: '012345678901234567890123456789012345678901234567890' },
  3010606: { name: 'Landline too long - example 7', landline: '012345678901234567890123456789012345678901234567890' },
  3010607: { name: 'Landline too long - example 8', landline: '012345678901234567890123456789012345678901234567890' },
  3010608: { name: 'Landline too long - example 9', landline: '012345678901234567890123456789012345678901234567890' },
  3010609: { name: 'Landline too long - example 10', landline: '012345678901234567890123456789012345678901234567890' },

  // 3010700-3010799: Mobile too short (10)
  3010700: { name: 'Mobile too short - example 1', mobile: '123' },
  3010701: { name: 'Mobile too short - example 2', mobile: '123' },
  3010702: { name: 'Mobile too short - example 3', mobile: '123' },
  3010703: { name: 'Mobile too short - example 4', mobile: '123' },
  3010704: { name: 'Mobile too short - example 5', mobile: '123' },
  3010705: { name: 'Mobile too short - example 6', mobile: '123' },
  3010706: { name: 'Mobile too short - example 7', mobile: '123' },
  3010707: { name: 'Mobile too short - example 8', mobile: '123' },
  3010708: { name: 'Mobile too short - example 9', mobile: '123' },
  3010709: { name: 'Mobile too short - example 10', mobile: '123' },

  // 3010800-3010899: Mobile too long (10)
  3010800: { name: 'Mobile too long - example 1', mobile: '012345678901234567890123456789012345678901234567890' },
  3010801: { name: 'Mobile too long - example 2', mobile: '012345678901234567890123456789012345678901234567890' },
  3010802: { name: 'Mobile too long - example 3', mobile: '012345678901234567890123456789012345678901234567890' },
  3010803: { name: 'Mobile too long - example 4', mobile: '012345678901234567890123456789012345678901234567890' },
  3010804: { name: 'Mobile too long - example 5', mobile: '012345678901234567890123456789012345678901234567890' },
  3010805: { name: 'Mobile too long - example 6', mobile: '012345678901234567890123456789012345678901234567890' },
  3010806: { name: 'Mobile too long - example 7', mobile: '012345678901234567890123456789012345678901234567890' },
  3010807: { name: 'Mobile too long - example 8', mobile: '012345678901234567890123456789012345678901234567890' },
  3010808: { name: 'Mobile too long - example 9', mobile: '012345678901234567890123456789012345678901234567890' },
  3010809: { name: 'Mobile too long - example 10', mobile: '012345678901234567890123456789012345678901234567890' },

  // Invalid business phone (3011000-3011999) - Invalid phone formats
  // 100-org-ID buffer between different scenario types to allow expansion
  // 3011000-3011009: Invalid phone 'not-a-phone' (10), buffer 3011010-3011099
  3011000: { name: 'Invalid phone not-a-phone - example 1', mobile: 'not-a-phone' },
  3011001: { name: 'Invalid phone not-a-phone - example 2', mobile: 'not-a-phone' },
  3011002: { name: 'Invalid phone not-a-phone - example 3', mobile: 'not-a-phone' },
  3011003: { name: 'Invalid phone not-a-phone - example 4', mobile: 'not-a-phone' },
  3011004: { name: 'Invalid phone not-a-phone - example 5', mobile: 'not-a-phone' },
  3011005: { name: 'Invalid phone not-a-phone - example 6', mobile: 'not-a-phone' },
  3011006: { name: 'Invalid phone not-a-phone - example 7', mobile: 'not-a-phone' },
  3011007: { name: 'Invalid phone not-a-phone - example 8', mobile: 'not-a-phone' },
  3011008: { name: 'Invalid phone not-a-phone - example 9', mobile: 'not-a-phone' },
  3011009: { name: 'Invalid phone not-a-phone - example 10', mobile: 'not-a-phone' },
  // 3011100-3011109: Too short (10), buffer 3011110-3011199
  3011100: { name: 'Invalid phone too short - example 1', mobile: '123' },
  3011101: { name: 'Invalid phone too short - example 2', mobile: '123' },
  3011102: { name: 'Invalid phone too short - example 3', mobile: '123' },
  3011103: { name: 'Invalid phone too short - example 4', mobile: '123' },
  3011104: { name: 'Invalid phone too short - example 5', mobile: '123' },
  3011105: { name: 'Invalid phone too short - example 6', mobile: '123' },
  3011106: { name: 'Invalid phone too short - example 7', mobile: '123' },
  3011107: { name: 'Invalid phone too short - example 8', mobile: '123' },
  3011108: { name: 'Invalid phone too short - example 9', mobile: '123' },
  3011109: { name: 'Invalid phone too short - example 10', mobile: '123' },
  // 3011200-3011209: Contains letters (10), buffer 3011210-3011299
  3011200: { name: 'Invalid phone contains letters - example 1', mobile: 'abc-def-ghij' },
  3011201: { name: 'Invalid phone contains letters - example 2', mobile: 'abc-def-ghij' },
  3011202: { name: 'Invalid phone contains letters - example 3', mobile: 'abc-def-ghij' },
  3011203: { name: 'Invalid phone contains letters - example 4', mobile: 'abc-def-ghij' },
  3011204: { name: 'Invalid phone contains letters - example 5', mobile: 'abc-def-ghij' },
  3011205: { name: 'Invalid phone contains letters - example 6', mobile: 'abc-def-ghij' },
  3011206: { name: 'Invalid phone contains letters - example 7', mobile: 'abc-def-ghij' },
  3011207: { name: 'Invalid phone contains letters - example 8', mobile: 'abc-def-ghij' },
  3011208: { name: 'Invalid phone contains letters - example 9', mobile: 'abc-def-ghij' },
  3011209: { name: 'Invalid phone contains letters - example 10', mobile: 'abc-def-ghij' },
  // 3011300-3011309: Special characters only (10), buffer 3011310-3011399
  3011300: { name: 'Invalid phone special chars - example 1', mobile: '!@#$%^&*()' },
  3011301: { name: 'Invalid phone special chars - example 2', mobile: '!@#$%^&*()' },
  3011302: { name: 'Invalid phone special chars - example 3', mobile: '!@#$%^&*()' },
  3011303: { name: 'Invalid phone special chars - example 4', mobile: '!@#$%^&*()' },
  3011304: { name: 'Invalid phone special chars - example 5', mobile: '!@#$%^&*()' },
  3011305: { name: 'Invalid phone special chars - example 6', mobile: '!@#$%^&*()' },
  3011306: { name: 'Invalid phone special chars - example 7', mobile: '!@#$%^&*()' },
  3011307: { name: 'Invalid phone special chars - example 8', mobile: '!@#$%^&*()' },
  3011308: { name: 'Invalid phone special chars - example 9', mobile: '!@#$%^&*()' },
  3011309: { name: 'Invalid phone special chars - example 10', mobile: '!@#$%^&*()' },
  // 3011400-3011409: Empty string (10), buffer 3011410-3011499
  3011400: { name: 'Invalid phone empty string - example 1', mobile: '' },
  3011401: { name: 'Invalid phone empty string - example 2', mobile: '' },
  3011402: { name: 'Invalid phone empty string - example 3', mobile: '' },
  3011403: { name: 'Invalid phone empty string - example 4', mobile: '' },
  3011404: { name: 'Invalid phone empty string - example 5', mobile: '' },
  3011405: { name: 'Invalid phone empty string - example 6', mobile: '' },
  3011406: { name: 'Invalid phone empty string - example 7', mobile: '' },
  3011407: { name: 'Invalid phone empty string - example 8', mobile: '' },
  3011408: { name: 'Invalid phone empty string - example 9', mobile: '' },
  3011409: { name: 'Invalid phone empty string - example 10', mobile: '' },
  // 3011500-3011509: Spaces only (10), buffer 3011510-3011599
  3011500: { name: 'Invalid phone spaces only - example 1', mobile: '   ' },
  3011501: { name: 'Invalid phone spaces only - example 2', mobile: '   ' },
  3011502: { name: 'Invalid phone spaces only - example 3', mobile: '   ' },
  3011503: { name: 'Invalid phone spaces only - example 4', mobile: '   ' },
  3011504: { name: 'Invalid phone spaces only - example 5', mobile: '   ' },
  3011505: { name: 'Invalid phone spaces only - example 6', mobile: '   ' },
  3011506: { name: 'Invalid phone spaces only - example 7', mobile: '   ' },
  3011507: { name: 'Invalid phone spaces only - example 8', mobile: '   ' },
  3011508: { name: 'Invalid phone spaces only - example 9', mobile: '   ' },
  3011509: { name: 'Invalid phone spaces only - example 10', mobile: '   ' },
  // 3011600-3011609: Wrong format (10), buffer 3011610-3011699
  3011600: { name: 'Invalid phone wrong format - example 1', mobile: '123-45' },
  3011601: { name: 'Invalid phone wrong format - example 2', mobile: '123-45' },
  3011602: { name: 'Invalid phone wrong format - example 3', mobile: '123-45' },
  3011603: { name: 'Invalid phone wrong format - example 4', mobile: '123-45' },
  3011604: { name: 'Invalid phone wrong format - example 5', mobile: '123-45' },
  3011605: { name: 'Invalid phone wrong format - example 6', mobile: '123-45' },
  3011606: { name: 'Invalid phone wrong format - example 7', mobile: '123-45' },
  3011607: { name: 'Invalid phone wrong format - example 8', mobile: '123-45' },
  3011608: { name: 'Invalid phone wrong format - example 9', mobile: '123-45' },
  3011609: { name: 'Invalid phone wrong format - example 10', mobile: '123-45' },
  // 3011700-3011709: Mixed invalid (letters and numbers) (10), buffer 3011710-3011799
  3011700: { name: 'Invalid phone mixed invalid - example 1', mobile: '12abc34' },
  3011701: { name: 'Invalid phone mixed invalid - example 2', mobile: '12abc34' },
  3011702: { name: 'Invalid phone mixed invalid - example 3', mobile: '12abc34' },
  3011703: { name: 'Invalid phone mixed invalid - example 4', mobile: '12abc34' },
  3011704: { name: 'Invalid phone mixed invalid - example 5', mobile: '12abc34' },
  3011705: { name: 'Invalid phone mixed invalid - example 6', mobile: '12abc34' },
  3011706: { name: 'Invalid phone mixed invalid - example 7', mobile: '12abc34' },
  3011707: { name: 'Invalid phone mixed invalid - example 8', mobile: '12abc34' },
  3011708: { name: 'Invalid phone mixed invalid - example 9', mobile: '12abc34' },
  3011709: { name: 'Invalid phone mixed invalid - example 10', mobile: '12abc34' },
  // 3011800-3011809: Too long (10), buffer 3011810-3011899
  3011800: { name: 'Invalid phone too long - example 1', mobile: '12345678901234567890' },
  3011801: { name: 'Invalid phone too long - example 2', mobile: '12345678901234567890' },
  3011802: { name: 'Invalid phone too long - example 3', mobile: '12345678901234567890' },
  3011803: { name: 'Invalid phone too long - example 4', mobile: '12345678901234567890' },
  3011804: { name: 'Invalid phone too long - example 5', mobile: '12345678901234567890' },
  3011805: { name: 'Invalid phone too long - example 6', mobile: '12345678901234567890' },
  3011806: { name: 'Invalid phone too long - example 7', mobile: '12345678901234567890' },
  3011807: { name: 'Invalid phone too long - example 8', mobile: '12345678901234567890' },
  3011808: { name: 'Invalid phone too long - example 9', mobile: '12345678901234567890' },
  3011809: { name: 'Invalid phone too long - example 10', mobile: '12345678901234567890' },
  // 3011900-3011909: Null as string (10), buffer 3011910-3011999
  3011900: { name: 'Invalid phone null as string - example 1', mobile: 'null' },
  3011901: { name: 'Invalid phone null as string - example 2', mobile: 'null' },
  3011902: { name: 'Invalid phone null as string - example 3', mobile: 'null' },
  3011903: { name: 'Invalid phone null as string - example 4', mobile: 'null' },
  3011904: { name: 'Invalid phone null as string - example 5', mobile: 'null' },
  3011905: { name: 'Invalid phone null as string - example 6', mobile: 'null' },
  3011906: { name: 'Invalid phone null as string - example 7', mobile: 'null' },
  3011907: { name: 'Invalid phone null as string - example 8', mobile: 'null' },
  3011908: { name: 'Invalid phone null as string - example 9', mobile: 'null' },
  3011909: { name: 'Invalid phone null as string - example 10', mobile: 'null' },

  // Email (3012000-3012299) - null/empty + invalid
  // 3012000-3012099: Email empty (10)
  3012000: { name: 'Email empty - example 1', email: '' },
  3012001: { name: 'Email empty - example 2', email: '' },
  3012002: { name: 'Email empty - example 3', email: '' },
  3012003: { name: 'Email empty - example 4', email: '' },
  3012004: { name: 'Email empty - example 5', email: '' },
  3012005: { name: 'Email empty - example 6', email: '' },
  3012006: { name: 'Email empty - example 7', email: '' },
  3012007: { name: 'Email empty - example 8', email: '' },
  3012008: { name: 'Email empty - example 9', email: '' },
  3012009: { name: 'Email empty - example 10', email: '' },

  // 3012100-3012199: Email too long (10) - EMAIL_MAX 254
  3012100: { name: 'Email too long - example 1', email: 'a'.repeat(250) + '@ab.co' },
  3012101: { name: 'Email too long - example 2', email: 'a'.repeat(250) + '@ab.co' },
  3012102: { name: 'Email too long - example 3', email: 'a'.repeat(250) + '@ab.co' },
  3012103: { name: 'Email too long - example 4', email: 'a'.repeat(250) + '@ab.co' },
  3012104: { name: 'Email too long - example 5', email: 'a'.repeat(250) + '@ab.co' },
  3012105: { name: 'Email too long - example 6', email: 'a'.repeat(250) + '@ab.co' },
  3012106: { name: 'Email too long - example 7', email: 'a'.repeat(250) + '@ab.co' },
  3012107: { name: 'Email too long - example 8', email: 'a'.repeat(250) + '@ab.co' },
  3012108: { name: 'Email too long - example 9', email: 'a'.repeat(250) + '@ab.co' },
  3012109: { name: 'Email too long - example 10', email: 'a'.repeat(250) + '@ab.co' },

  // 3012200-3012299: Email invalid format (10)
  3012200: { name: 'Email invalid format - example 1', email: 'not-an-email' },
  3012201: { name: 'Email invalid format - example 2', email: 'not-an-email' },
  3012202: { name: 'Email invalid format - example 3', email: 'a@b' },
  3012203: { name: 'Email invalid format - example 4', email: 'a@b' },
  3012204: { name: 'Email invalid format - example 5', email: 'missing-at.com' },
  3012205: { name: 'Email invalid format - example 6', email: 'missing-at.com' },
  3012206: { name: 'Email invalid format - example 7', email: '@nodomain.co' },
  3012207: { name: 'Email invalid format - example 8', email: '@nodomain.co' },
  3012208: { name: 'Email invalid format - example 9', email: 'nodot@domain' },
  3012209: { name: 'Email invalid format - example 10', email: 'nodot@domain' }
}

import { sfdBusinessLookupPerformance } from './performance.js'

// Build org lookup for every org ID in sfdBusinessDetailsLookup (CRN 3020000000, personId 3009100).
const businessDetailsOrgLookup = Object.fromEntries(
  Object.keys(sfdBusinessDetailsLookup).map((orgId) => {
    const id = Number(orgId)
    return [id, { sbi: 300900001 + (id - 3009000), customers: [3009100] }]
  })
)

// All static personal.js test users who use the shared Test Org in defra-id.data.json (org 3001458).
// Business details test data orgs are in sfdBusinessDetailsLookup; lookup built from it above.
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
  ...businessDetailsOrgLookup,
  80000001: { sbi: 8000000001, customers: [8000001], cphs: [] } // org with no CPH
}

export const sfdBusinessLookup = {
  ...sfdBusinessLookupCore,
  ...sfdBusinessLookupPerformance
}
