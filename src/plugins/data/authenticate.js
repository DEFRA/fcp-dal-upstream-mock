import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const authenticateAnswers = (crn) => {
  return loadFromFixtures(`./crn/${crn}/authenticate.json`)
}
