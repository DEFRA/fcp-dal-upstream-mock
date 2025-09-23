import Boom from '@hapi/boom'

export const checkId = (request, idName) => {
  const _id = { ...request?.params }[idName]
  const id = parseInt(_id, 10)

  // When parsing numbers such as 9.517736547475587e-91 will return 9, `${id}` !== `${_id}` will verify the original value passes the validation
  if (isNaN(id) || id < 1 || `${id}`.length > 20 || `${id}` !== `${_id}`) {
    throw Boom.forbidden(
      `bad ${idName}: ${id}, is not a whole number in the acceptable range`,
      request
    )
  }

  return `${id}`
}

export const isDefined = (param) => param !== undefined
export const isValidBoolean = (param) => param === true || param === false
export const isValidString = (param) => typeof param === 'string' && param.length > 0
export const isValidNumber = (param) => typeof param === 'number'

export const checkLockUnlockRequestBody = (request, partyNoteValidType) => {
  const { partyNoteType, note, reason } = request?.payload

  if (!partyNoteType || partyNoteType != partyNoteValidType) {
    throw Boom.badRequest(`partyNoteType expected to be '${partyNoteValidType}'`)
  }

  const parametersToValidate = [note, reason].filter(isDefined)

  const isValidType = (param) => {
    const type = typeof param
    switch (type) {
      case 'string':
        return isValidString(param)
      case 'boolean':
        return isValidBoolean(param)
      case 'number':
        return isValidNumber(param)
      default:
        return false
    }
  }
  const validParameters = parametersToValidate.filter(isValidType)

  if (validParameters.length !== 1) {
    throw Boom.badRequest(`Expected '${validParameters}' to be a valid`)
  }
}
