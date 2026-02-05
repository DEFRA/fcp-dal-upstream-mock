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
      address2: 'Back entrance',
      address3: null,
      city: 'Town',
      county: null,
      postalCode: 'KL8 9MN',
      country: 'United Kingdom'
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

const sfdBusinessLookupCore = {
  // Defra ID stub "Test User" (CRN 3000000000, defra-id.data.json) — org 3001458, SBI 300145801 (personId 3000000)
  3001458: { sbi: 300145801, customers: [3000000] },
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
