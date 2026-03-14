import { retrievePayments } from '../../../../src/factories/payments.factory.js'
import { loadSchema } from '../../../../src/utils/validatePayload.js'

describe('Fake Payments', () => {
  let schema
  beforeAll(async () => {
    await loadSchema('/routes/hitachi/payments-schema.oas.yml').then((s) => (schema = s))
  })

  describe('factory', () => {
    it('should generate payments array matching the schema', () => {
      const { PaymentsData } = schema.components.schemas
      const paymentsResponse = retrievePayments('6561479446')
      expect({
        ...paymentsResponse,
        // add dummy values for fields calculated JIT in the route
        parmSupplierInfo: { ...paymentsResponse.parmSupplierInfo, parmSupplier: 'business name' },
        InfoMessages: ['added later']
      }).toConformToSchema(PaymentsData)
    })
  })
})
