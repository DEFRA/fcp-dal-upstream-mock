// Wiring notes:
// - defra-id.data.json (frontend) sets organisationId/sbi in auth tokens.
// - sfdPersonLookup + sfdBusinessLookup provide DAL mock ids.
// - sfdBusinessDetailsLookup allows stable organisation overrides.
export { sfdBusinessDetailsLookup, sfdBusinessLookup } from './business.js'
export { sfdPersonLookup } from './personal.js'

