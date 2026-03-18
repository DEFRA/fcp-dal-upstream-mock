import { addMoney } from '../utils/common.js'
import { fakeId, faker, safeSeed } from './common.js'
import { frnToPaymentOverrides } from './id-lookups.js'

const createLineItem = (overrides = {}) => ({
  parmAgreementNumber:
    faker.string.alpha({ length: 1, casing: 'upper' }) +
    faker.string.numeric({ length: 7, allowLeadingZeros: true }),
  parmClaimRefNumber: `${fakeId()}`,
  parmScheme: faker.string.numeric({ length: { min: 3, max: 6 } }),
  parmDescription: faker.lorem.sentences(1),
  parmMarketingYear: faker.date.recent({ days: 400 }).getFullYear().toString(),
  parmAmount: faker.number.float({ min: 0, max: 10_000, fractionDigits: 2 }),
  ...overrides
})

export const createPayment = ({ parmLineItems, ...overrides } = {}) => {
  parmLineItems = Array.from(
    parmLineItems ?? { length: faker.number.int({ min: 1, max: 5 }) },
    (itemOverrides) => createLineItem(itemOverrides)
  )

  return {
    parmPaymentReference: faker.string.alphanumeric({ length: { max: 18 }, casing: 'upper' }),
    parmDate: faker.date.past({ years: 5 }).toISOString().substring(0, 19),
    parmAmount: parmLineItems.reduce((sum, item) => addMoney(sum, item.parmAmount), 0),
    parmCurrency: 'GBP',
    parmLineItems,
    ...overrides
  }
}

const responseContentsCache = {}

export const retrievePayments = (frn) => {
  // check the cache for previously generated contents
  const cachedResponseContents = responseContentsCache[frn]
  if (cachedResponseContents) {
    return cachedResponseContents
  }

  // check the FRN exists and grab any static overrides
  const overrides = frnToPaymentOverrides[frn]
  if (overrides === undefined) {
    return null
  }

  // generate response contents and payments data
  safeSeed(frn)
  const paymentResponseContent = {
    Result: true,
    parmSupplierInfo: {
      parmHoldCodes: ['AUTOVERIFY', 'NTHLD'], // TODO: what other hold codes are possible?
      parmAccountLast4: `****${faker.string.numeric({ length: 4, allowLeadingZeros: true })}`,
      parmSortCode: `${faker.string.numeric({ length: 6, allowLeadingZeros: true })}`
    },
    parmPayments: Array.from(
      overrides.parmPayments ?? { length: faker.number.int({ min: 0, max: 50 }) },
      (paymentOverrides) => createPayment(paymentOverrides)
    ),
    ...overrides
  }
  responseContentsCache[frn] = paymentResponseContent

  return paymentResponseContent
}
