// Wiring notes:
// - defra-id.data.json (frontend) sets organisationId/sbi in auth tokens.
// - sfdPersonLookup + sfdBusinessLookup provide DAL mock ids.
// - sfdPersonLookup and sfdBusinessLookup merge edge-case + performance data here.
import { sfdBusinessLookupCore } from './business.js'
import { sfdPersonLookup as sfdPersonLookupEdgeCase } from './personal.js'
import { sfdPersonLookupPerformance, sfdBusinessLookupPerformance } from './performance.js'
export const sfdPersonLookup = { ...sfdPersonLookupEdgeCase, ...sfdPersonLookupPerformance }

const sfdBusinessLookupMerged = { ...sfdBusinessLookupCore, ...sfdBusinessLookupPerformance }
// Single source of truth for customer shape: coerce raw person-id numbers to { personId }.
export const sfdBusinessLookup = Object.fromEntries(
  Object.entries(sfdBusinessLookupMerged).map(([orgId, orgData]) => [
    orgId,
    {
      ...orgData,
      customers: Array.isArray(orgData.customers)
        ? orgData.customers.map((c) => (typeof c === 'number' ? { personId: c } : c))
        : orgData.customers
    }
  ])
)
