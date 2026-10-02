const LINK_VALIDITY_HOURS = 12

/**
 * Lookup of email validation records by crn.
 * An email validation record is used to identify a customer that
 * has requested to validate their email address during the login process
 * (you cannot login with a non validated email address)
 * crn is the key, email validation record is the value
 */
const emailValidationRecordsByCrn = {}

const normaliseEmail = (email) => String(email ?? '').toLowerCase()

export const saveEmailValidation = ({
  customerReference,
  partyDigitalContactId,
  email,
  linkSentDate
}) => {
  const normalisedEmail = normaliseEmail(email)
  const conflictingRecord = Object.values(emailValidationRecordsByCrn).find(
    (record) =>
      normaliseEmail(record.email) === normalisedEmail &&
      record.customerReference !== customerReference
  )
  if (conflictingRecord) {
    return { conflict: true, owningCrn: conflictingRecord.customerReference }
  }

  emailValidationRecordsByCrn[customerReference] = {
    customerReference,
    partyDigitalContactId,
    email,
    linkSentDate
  }

  return { conflict: false }
}

export const findEmailValidation = (customerReference) =>
  emailValidationRecordsByCrn[customerReference]

export const deleteEmailValidation = (customerReference) => {
  delete emailValidationRecordsByCrn[customerReference]
}

export const isEmailValidationLinkExpired = (linkSentDate) => {
  const sentAt = new Date(linkSentDate).getTime()
  if (Number.isNaN(sentAt)) {
    return true
  }

  return Date.now() - sentAt > LINK_VALIDITY_HOURS * 60 * 60 * 1000
}
