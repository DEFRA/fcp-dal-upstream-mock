import { frnToOrgId } from '../../factories/id-lookups.js'
import { retrieveOrganisation } from '../../factories/organisation/organisation.factory.js'
import { retrievePayments } from '../../factories/payments.factory.js'

const dataErrorResponse = {
  Message:
    'An exception occured when invoking the operation ' +
    '- Object reference not set to an instance of an object.',
  ExceptionType: 'NullReferenceException',
  ActivityId: 'some-long-uuid'
}

const problemResponse = {
  $id: '1',
  Result: false,
  parmSupplierInfo: null,
  parmPayments: null
}
const frnNotProvidedResponse = {
  ...problemResponse,
  InfoMessages: ['*** No FRN provided', 'No data retrieved for this request']
}
const frnNotFoundResponse = {
  ...problemResponse,
  InfoMessages: ['*** FRN does not exist', 'No data retrieved for this request']
}
const badDateFormatResponse = {
  ...problemResponse,
  InfoMessages: ['*** Invalid date range provided', 'No data retrieved for this request']
}

export const payments = [
  {
    method: 'POST',
    path:
      '/services/RSFVendPaymentDetailsServiceGroup/' +
      'RSFVendPaymentDetailsService/getSupplierPaymentsPackage',
    handler: async (request, h) => {
      // check request body
      const body = request?.payload?.request || {}
      if (
        !body?.payment ||
        !body?.audit ||
        typeof body.payment !== 'object' ||
        typeof body.audit !== 'object'
      ) {
        return h.response(dataErrorResponse)
      }

      // check FRN specified (SupplierAccount)
      const { SupplierAccount, FromDate, ToDate } = body.payment
      if (!SupplierAccount) {
        return h.response(frnNotProvidedResponse)
      }

      // check date range filters
      const fromDate = new Date(FromDate).getTime()
      const toDate = new Date(ToDate).getTime()
      if ((FromDate && Number.isNaN(fromDate)) || (ToDate && Number.isNaN(toDate))) {
        return h.response(badDateFormatResponse)
      }

      // check a business with the specified FRN exists
      const orgId = frnToOrgId[SupplierAccount]
      if (!orgId) {
        return h.response(frnNotFoundResponse)
      }

      // lookup/generate response contents
      let { parmPayments, ...responseContents } = retrievePayments(SupplierAccount)

      // conditionally apply date range filters
      if (FromDate || ToDate) {
        parmPayments = parmPayments.filter((payment) => {
          const paymentDate = new Date(payment.parmDate).getTime()
          return (
            (Number.isNaN(fromDate) || paymentDate >= fromDate) &&
            (Number.isNaN(toDate) || paymentDate <= toDate)
          )
        })
      }

      // set the business name field
      responseContents.parmSupplierInfo.parmSupplier = retrieveOrganisation(orgId).name

      // add the payments count and respond
      return h.response({
        ...responseContents,
        parmPayments,
        InfoMessages: [`No. of payments retrieved = ${parmPayments.length}`]
      })
    }
  }
]

export const router = {
  plugin: {
    name: 'hitachi-router',
    register: (server, _) => {
      server.route(payments)
    }
  }
}
