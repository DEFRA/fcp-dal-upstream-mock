/**
 * Person stubs for FCP performance-testing. Same shape as entries in personal.js
 * (person ID to PersonStub); merged into fcpPersonLookup in fcp-test-data/index.js.
 */
export const fcpPersonLookupPerformance = {
  5282344: { crn: '9700001000' }
}

/**
 * Org lookups for FCP performance testing. Same shape as in business.js
 * (orgId -> { sbi, customers }); merged into fcpBusinessLookup in fcp-test-data/index.js.
 */
export const fcpBusinessLookupPerformance = {
  5598801: { sbi: 870000001, customers: [5282344] }
}
