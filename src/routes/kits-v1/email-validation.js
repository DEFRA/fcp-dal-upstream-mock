import {
  findEmailValidation,
  isEmailValidationLinkExpired,
  saveEmailValidation
} from '../../factories/person/email-validation.factory.js'

export const emailValidation = [
  {
    method: 'POST',
    path: '/external-auth/email-validation',
    handler: async (request, h) => {
      const { conflict } = saveEmailValidation(request.payload ?? {})
      if (conflict) {
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

      if (
        !record ||
        record.partyDigitalContactId !== partyDigitalContactId ||
        record.email?.toLowerCase() !== String(email ?? '').toLowerCase()
      ) {
        return h.response().code(404)
      }

      if (isEmailValidationLinkExpired(record.linkSentDate)) {
        return h.response().code(401)
      }

      return h.response().code(200)
    }
  }
]
