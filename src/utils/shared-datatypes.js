import Boom from '@hapi/boom'

export const checkId = (request, idName) => {
  const id = parseInt({ ...request?.params }[idName], 10)

  if (isNaN(id) || id < 0 || `${id}`.length > 20) {
    throw Boom.forbidden(`bad ${idName}: ${id}, is not an integer in the acceptable range`, request)
  }

  return `${id}`
}
