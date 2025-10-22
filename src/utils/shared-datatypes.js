import Boom from '@hapi/boom'

export const checkId = (request, idName) => {
  const _id = { ...request?.params }[idName]
  const id = Number.parseInt(_id, 10)

  // When parsing numbers such as 9.517736547475587e-91 will return 9,
  // `${id}` !== `${_id}` will verify the original value passes the validation
  if (Number.isNaN(id) || id < 1 || `${id}`.length > 20 || `${id}` !== `${_id}`) {
    throw Boom.forbidden(`bad ${idName}: ${id}, is not an integer in the acceptable range`, request)
  }

  return `${id}`
}
