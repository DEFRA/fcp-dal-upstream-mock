import fs from 'node:fs'
import { sfdBusinessLookup, sfdPersonLookup } from './sfd-test-data.js'

export const personIdToCRN = {
  ...sfdPersonLookup,

  // people in org 1111111111 only
  11111111: '1111111100',
  11111112: '1111111200',
  11111113: '1111111300',
  11111114: '1111111400',
  11111115: '1111111500',
  11111116: '1111111600',
  11111117: '1111111700',
  11111118: '1111111800',
  11111119: '1111111900',
  // people in org 1111111111 and 2222222222
  11111122: '1111112200',
  11111222: '1111122200',
  11112222: '1111222200',
  11122222: '1112222200',
  11222222: '1122222200',
  12222222: '1222222200',
  // people in org 2222222222 only
  22222220: '2222222000',
  22222221: '2222222100',
  22222222: '2222222200',
  22222223: '2222222300',
  22222224: '2222222400',
  22222225: '2222222500',
  22222226: '2222222600',
  22222227: '2222222700',
  22222228: '2222222800',
  22222229: '2222222900',
  22222230: '2222223000',
  22222231: '2222223100',
  22222232: '2222223200',
  22222233: '2222223300',
  22222234: '2222223400',
  22222235: '2222223500',
  22222236: '2222223600',
  22222237: '2222223700',
  22222238: '2222223800',
  22222239: '2222223900',
  22222240: '2222224000',
  22222241: '2222224100',
  22222242: '2222224200',
  22222243: '2222224300',
  22222244: '2222224400',
  22222245: '2222224500',
  22222246: '2222224600',
  22222247: '2222224700',
  22222248: '2222224800',
  22222249: '2222224900',
  22222250: '2222225000',
  22222251: '2222225100',
  22222252: '2222225200',
  22222253: '2222225300',
  22222254: '2222225400',
  22222255: '2222225500',
  22222256: '2222225600',
  22222257: '2222225700',
  22222258: '2222225800',
  22222259: '2222225900',
  22222260: '2222226000',
  22222261: '2222226100',
  22222262: '2222226200',
  22222263: '2222226300',
  22222264: '2222226400',
  22222265: '2222226500',
  22222266: '2222226600',
  22222267: '2222226700',
  22222268: '2222226800',
  22222269: '2222226900',
  22222270: '2222227000',
  22222271: '2222227100',
  22222272: '2222227200',
  22222273: '2222227300',
  22222274: '2222227400',
  22222275: '2222227500',
  22222276: '2222227600',
  22222277: '2222227700',
  22222278: '2222227800',
  22222279: '2222227900',

  // customers not in any org - useful for DAL acceptance tests and the like
  9000000: '9000000000',
  9000001: '9000000001',

  // from dev CRM
  5302028: '1103020285',
  // from dev CRM, but do not exist on `upgrade`
  9900000: '8562286973',
  9900001: '1638563942',
  9900002: '3170633316',
  9900003: '1343571956'
}

const validGeometries = JSON.parse(
  // Generated using scripts/generate_geometries.sh
  fs.readFileSync(new URL('./valid-geometries.json', import.meta.url))
)
export const orgIdLookup = {
  ...sfdBusinessLookup,

  1000000000: {
    sbi: 1000000000,
    customers: [], // org with no customers
    agreements: [], // ... no agreements
    applications: [], // ... no applications
    cphs: [], // ... no CPHs
    land: [] // ... no land
  },
  1111111111: {
    sbi: 1111111111,
    customers: [
      11111111, 11111112, 11111113, 11111114, 11111115, 11111116, 11111117, 11111118, 11111119,
      11111122, 11111222, 11112222, 11122222, 11222222, 12222222
    ],
    agreements: [
      {
        contract_id: '1111111111',
        payment_schedules: [1111111111, 1111111112, 1111111113]
      },
      {
        contract_id: '1111111112',
        payment_schedules: [1111111121, 1111111122, 1111111123]
      },
      {
        contract_id: '1111111113',
        payment_schedules: [1111111131, 1111111132, 1111111133]
      }
    ],
    applications: [{ application_history: [{}] }],
    cphs: [{}], // 1 CPH
    land: {
      parcels: [
        {
          id: 7386091,
          properties: {
            area: '10270.39',
            pendingDigitisation: false,
            sheetId: 'SS6627',
            parcelId: '5662'
          },
          geometry: validGeometries[0],
          covers: [
            {
              id: 11769295,
              properties: {
                area: '10270.38',
                code: '110',
                name: 'Arable Land',
                isBpsEligible: 'true'
              },
              type: 'Feature',
              geometry: validGeometries[2]
            },
            {
              id: 11769235,
              properties: {
                area: '25409.79',
                code: '131',
                name: 'Permanent Grassland',
                isBpsEligible: 'true'
              },
              type: 'Feature',
              geometry: validGeometries[3]
            }
          ],
          uses: [
            {
              lu_code: 'WO25'
            }
          ]
        },
        {
          id: 7386092,
          properties: {
            area: '10270.39',
            pendingDigitisation: 'false',
            sheetId: 'SS6828',
            parcelId: '3818'
          },
          geometry: validGeometries[1],
          uses: [{}]
        }
      ]
    }
  },
  2222222222: {
    sbi: 2222222222,
    customers: [
      11111122, 11111222, 11112222, 11122222, 11222222, 12222222, 22222220, 22222221, 22222222,
      22222223, 22222224, 22222225, 22222226, 22222227, 22222228, 22222229, 22222230, 22222231,
      22222232, 22222233, 22222234, 22222235, 22222236, 22222237, 22222238, 22222239, 22222240,
      22222241, 22222242, 22222243, 22222244, 22222245, 22222246, 22222247, 22222248, 22222249,
      22222250, 22222251, 22222252, 22222253, 22222254, 22222255, 22222256, 22222257, 22222258,
      22222259, 22222260, 22222261, 22222262, 22222263, 22222264, 22222265, 22222266, 22222267,
      22222268, 22222269, 22222270, 22222271, 22222272, 22222273, 22222274, 22222275, 22222276,
      22222277, 22222278, 22222279
    ],
    agreements: [
      {
        contract_id: '2222222222',
        payment_schedules: [2222222212, 2222222213, 2222222214]
      },
      {
        contract_id: '2222222223',
        payment_schedules: [2222222222, 2222222223, 2222222224]
      },
      {
        contract_id: '2222222224',
        payment_schedules: [2222222232, 2222222233, 2222222234]
      }
    ]
  },

  // business from dev CRM
  5565448: {
    sbi: 107183280,
    customers: [],
    applications: [{ application_history: [{}] }], // 1 application with 1 transition entry
    cphs: Array.from({ length: 8 }, () => ({})) // 8 CPHs
  },
  5559799: { sbi: 106238988, customers: [5302028] },
  5560725: { sbi: 106284736, customers: [5302028, 9900000, 9900001, 9900002, 9900003] },
  5625145: { sbi: 107591843, customers: [5302028, 5692562] },
  5447505: { sbi: 121428499, customers: [5302028] },

  // for DAL mutation tests
  9000001: { sbi: 900000001, customers: [] },
  9000002: { sbi: 900000002, customers: [] }
}

// Derived inverses — calculated once
export const crnToPersonId = Object.fromEntries(
  Object.entries(personIdToCRN).map(([personId, crn]) => [crn, personId])
)
export const sbiToOrgId = {}
export const orgIdToSbi = {}
export const orgIdToPersonIds = {}
export const personIdToOrgIds = {}

Object.entries(orgIdLookup).forEach(([orgId, { sbi, customers }]) => {
  orgIdToSbi[orgId] = sbi
  sbiToOrgId[sbi] = orgId
  orgIdToPersonIds[orgId] = customers
  customers.forEach((personId) => {
    if (!personIdToOrgIds[personId]) {
      personIdToOrgIds[personId] = []
    }
    personIdToOrgIds[personId].push(Number(orgId))
  })
})
