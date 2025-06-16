const personIdLookup = {
  11111111: {
    crn: '11111111',
    businesses: {
      11111111: {
        sbi: 'sbi111'
      },
      22222222: {
        sbi: 'sbi222'
      }
    }
  }
}

// Derived inverses — calculated once
export const personIdToCRN = {}
export const crnToPersonId = {}
export const sbiToOrgId = {}
export const orgIdToSbi = {}
export const sbiToPersonIds = {}

for (const [personId, { crn, businesses }] of Object.entries(personIdLookup)) {
  personIdToCRN[personId] = crn
  crnToPersonId[crn] = personId

  for (const [orgId, { sbi }] of Object.entries(businesses)) {
    sbiToOrgId[sbi] = orgId

    if (!orgIdToSbi[orgId]) orgIdToSbi[orgId] = []
    orgIdToSbi[orgId].push(sbi)

    if (!sbiToPersonIds[sbi]) sbiToPersonIds[sbi] = []
    sbiToPersonIds[sbi].push(personId)
  }
}
