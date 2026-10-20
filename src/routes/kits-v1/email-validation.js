import { createLogger } from '../../common/helpers/logging/logger.js'
import {
  deleteEmailValidation,
  findEmailValidation,
  isEmailValidationLinkExpired,
  saveEmailValidation
} from '../../factories/person/email-validation.factory.js'
import { markPersonEmailValidated } from '../../factories/person/person.factory.js'

const logger = createLogger('email-validation.route')

export const emailValidation = [
  {
    method: 'POST',
    path: '/external-auth/email-validation',
    handler: async (request, h) => {
      const { customerReference } = request.payload ?? {}
      // TODO: once we have access to this endpoint, check the behaviour when
      // a: no customer exists for the reference
      // b: no digital contact records exists for the partyDigitalContactId
      // c: the email doesn't match that of the partyDigitalContactId
      // see https://eaflood.atlassian.net/browse/FCPDAL-440
      const { conflict, owningCrn } = saveEmailValidation(request.payload ?? {})
      if (conflict) {
        logger.info(
          `Email is already associated with CRN ${owningCrn}, cannot save for CRN ${customerReference}`
        )
        return h.response().code(403)
      }

      // Upstream has a documented 409 (email already saved for this CRN) but code analysis
      // shows that path is dead — a same-CRN duplicate save silently succeeds with 200.
      return h.response().code(200)
    }
  },
  {
    method: 'POST',
    path: '/external-auth/email-validation/validate-email',
    handler: async (request, h) => {
      // Upstream matches on partyDigitalContactId and email only; customerReference is ignored
      const { partyDigitalContactId, email } = request.payload ?? {}
      const record = findEmailValidation({ partyDigitalContactId, email })

      if (!record) {
        logger.info(
          `No email validation record for partyDigitalContactId ${partyDigitalContactId} and email provided`
        )
        return h
          .response({
            servlet: 'jersey',
            message: 'Not Found',
            url: request.path,
            status: '404'
          })
          .code(404)
      }

      const { customerReference } = record

      if (isEmailValidationLinkExpired(record.linkSentDate)) {
        logger.info(
          `link expired for CRN ${customerReference} (linkSentDate ${record.linkSentDate})`
        )
        return h.response().code(401)
      }

      markPersonEmailValidated(customerReference, record.email)
      deleteEmailValidation(customerReference)

      return h.response().code(200)
    }
  }
]
