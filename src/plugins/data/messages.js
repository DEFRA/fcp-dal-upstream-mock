import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const messages = (personId, page = 1, size = 3) => {
  const response = loadFromFixtures(`./personId/${personId}/messages.json`)
  const end = size * page
  const start = end - size

  return {
    ...response,
    notifications: response.notifications.slice(start, end)
  }
}
