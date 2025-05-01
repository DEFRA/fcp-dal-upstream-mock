import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const personById = (id) => {
  return loadFromFixtures(`./personId/${id}/detail.json`)
}

export const personByCrn = (crn) => {
  const personIdCrnMap = loadFromFixtures('./personId/personIdCrnMap.json')
  return personById(personIdCrnMap[crn])
}
