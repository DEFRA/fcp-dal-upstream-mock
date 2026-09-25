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
      const { customerReference, email } = request.payload ?? {}
      // TODO: once we have access to this endpoint, check the behaviour when
      // a: no customer exists for the reference
      // b: no digital contact records exists for the partyDigitalContactId
      // c: the email doesn't match that of the partyDigitalContactId
      const { conflict, owningCrn } = saveEmailValidation(request.payload ?? {})
      if (conflict) {
        logger.info(
          `Email ${email} is already associated with CRN ${owningCrn}, cannot save for CRN ${customerReference}`
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
      const { customerReference, partyDigitalContactId, email } = request.payload ?? {}
      const record = findEmailValidation(customerReference)

      if (!record) {
        logger.info(`No email validation record for CRN ${customerReference}`)
        return h.response().code(404)
      }

      if (record.partyDigitalContactId !== partyDigitalContactId) {
        logger.info(
          `partyDigitalContactId mismatch for CRN ${customerReference} (expected ${record.partyDigitalContactId}, received ${partyDigitalContactId})`
        )
        return h.response().code(404)
      }

      if (record.email?.toLowerCase() !== String(email ?? '').toLowerCase()) {
        logger.info(
          `email mismatch for CRN ${customerReference} (expected ${record.email}, received ${email})`
        )
        return h.response().code(404)
      }

      if (isEmailValidationLinkExpired(record.linkSentDate)) {
        logger.info(
          `link expired for CRN ${customerReference} (linkSentDate ${record.linkSentDate})`
        )
        return h.response().code(401)
      }

      markPersonEmailValidated(customerReference)
      // TODO: assuming this api also deleted the email validation record, but will need to test with actual api
      // once we have access
      deleteEmailValidation(customerReference)

      return h.response().code(200)
    }
  }
]
