export const checkSbi = (request) => {
  const sbi = parseInt(request?.params?.sbi, 10)

  if (isNaN(sbi) || sbi < 0 || `${sbi}`.length > 20) {
    throw Boom.forbidden('Request forbidden by administrative rules.', request)
  }

  return sbi
}

export const checkOrganisationId = (request) => {
  const organisationId = parseInt(request?.params?.organisationId, 10)

  if (isNaN(organisationId) || organisationId < 0 || `${organisationId}`.length > 20) {
    throw Boom.forbidden(
      `bad organisationId: ${organisationId}, is not an integer in the acceptable range`,
      request
    )
  }

  return organisationId
}
