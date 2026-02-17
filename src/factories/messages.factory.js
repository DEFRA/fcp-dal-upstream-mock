import { personIdToOrgIds } from '../factories/id-lookups.js'
import { fakeId, faker, nullOrFake, safeSeed } from './common.js'

const businessPersonMessages = {}
const maxYearsInPast = 4

const createMessageMock = (orgId, personId, deleted) => {
  const readAt = nullOrFake(
    () => Number.parseInt(faker.date.past(maxYearsInPast).getTime() / 1000) * 1000
  )
  return {
    id: fakeId(),
    personId,
    organisationId: orgId,
    messageId: fakeId(),
    readAt,
    archivedAt: deleted ? faker.date.recent() : null,
    archive: deleted,
    createdAt: faker.date.past(readAt ? { refDate: readAt } : undefined).getTime(),
    title: faker.lorem.sentence({ min: 3, max: 10 }),
    body: `<p>${faker.lorem.sentence()}</p>`,
    category: 'OrganisationLevel',
    bespokeNotificationId: null
  }
}

const generateMessagesPayload = (orgId, personId, numMessages, numDeleted) => {
  const notifications = Array.from({ length: numMessages }, (_, i) =>
    createMessageMock(orgId, personId, numDeleted <= i ? false : true)
  )
  const readCount = notifications.filter((n) => n.readAt).length

  return {
    notifications,
    resultCount: notifications.length,
    readCount,
    unreadCount: notifications.length - readCount
  }
}

export const retrieveMessages = (orgId, personId, page = 1) => {
  ;[orgId, personId] = safeSeed([orgId, personId])

  const totalPages = faker.number.int({ min: 1, max: 3 })

  // check person exists and org is related to the person
  // Very strangely the upstream returns a successful response if they don't exist
  const orgIds = personIdToOrgIds[personId]
  if (!orgIds?.includes(orgId) || page > totalPages) {
    return {
      notifications: [],
      resultCount: 0,
      readCount: 0,
      unreadCount: 0
    }
  }

  const messages = businessPersonMessages[`${orgId}-${personId}`]
  if (messages) {
    return messages
  }

  // Choose random message count, unless special case
  let messageCount, deletedMessages
  if (orgId === 3333333333 && personId === 11111120) {
    messageCount = 0
    deletedMessages = 0
  } else if (orgId === 3333333334 && personId === 11111141) {
    messageCount = 10
    deletedMessages = 5
  } else {
    messageCount = faker.number.int({ min: 0, max: 10 })
    deletedMessages = 0
  }

  // Make message dates more varied

  const messagesPayload = generateMessagesPayload(orgId, personId, messageCount, deletedMessages)
  businessPersonMessages[`${orgId}-${personId}`] = messagesPayload
  return messagesPayload
}
