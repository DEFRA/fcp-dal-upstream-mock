/**
 * Person stubs for FCP performance-testing. Same shape as entries in personal.js
 * (person ID to PersonStub); merged into fcpPersonLookup in fcp-test-data/index.js.
 */
export const fcpPersonLookupPerformance = {
  5282344: { crn: '9700001000' },
  5282345: { crn: '9100010101' },
  5282346: { crn: '9100010102' }
}

/**
 * Org lookups for FCP performance testing. Same shape as in business.js
 * (orgId -> { sbi, customers }); merged into fcpBusinessLookup in fcp-test-data/index.js.
 */
export const fcpBusinessLookupPerformance = {
  5598801: { sbi: 870000001, customers: [5282344] },
  5598802: { sbi: 810100101, customers: [5282345, 5282346] },
  5598803: { sbi: 810100102, customers: [5282345] },
  5598804: { sbi: 810100103, customers: [5282345, 5282346] }
}
