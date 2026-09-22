const LINK_VALIDITY_HOURS = 12

const recordsByCrn = {}
const crnByEmail = {}

const normaliseEmail = (email) => String(email ?? '').toLowerCase()

export const saveEmailValidation = ({
  customerReference,
  partyDigitalContactId,
  email,
  linkSentDate
}) => {
  const normalisedEmail = normaliseEmail(email)
  const owningCrn = crnByEmail[normalisedEmail]
  if (owningCrn && owningCrn !== customerReference) {
    return { conflict: true }
  }

  const existing = recordsByCrn[customerReference]
  if (existing) {
    delete crnByEmail[normaliseEmail(existing.email)]
  }

  recordsByCrn[customerReference] = {
    customerReference,
    partyDigitalContactId,
    email,
    linkSentDate
  }
  crnByEmail[normalisedEmail] = customerReference

  return { conflict: false }
}

export const findEmailValidation = (customerReference) => recordsByCrn[customerReference]

export const isEmailValidationLinkExpired = (linkSentDate) => {
  const sentAt = new Date(linkSentDate).getTime()
  if (Number.isNaN(sentAt)) {
    return true
  }

  return Date.now() - sentAt > LINK_VALIDITY_HOURS * 60 * 60 * 1000
}
