import { loadFromFixtures } from '../../utils/loadFromFixtures.js'

export const messages = (personId, page = 1, size = 3) => {
  const response = loadFromFixtures(`./personId/${personId}/messages.json`)
  const end = size * page
  const start = end - size

  // If this person is the 'large message set' test user, add messages by repeatedly duplicating the first one they have
  if (personId == 9000001) {
    let numberOfMessages = 500
    const messageTemplate = JSON.parse(JSON.stringify(response.notifications[0]))

    for (let i = 0; i < numberOfMessages; i++) {
      messageTemplate.id += i
      response.notifications.push(messageTemplate)
    }
  }

  return {
    ...response,
    notifications: response.notifications.slice(start, end)
  }
}
