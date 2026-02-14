import { personIdToOrgIds } from '../factories/id-lookups.js'
import { fakeId, faker, nullOrFake, safeSeed } from './common.js'

const businessPersonMessages = {}

const createMessageMock = (orgId, personId) => {
  const readAt = nullOrFake(() => Number.parseInt(faker.date.past().getTime() / 1000) * 1000)
  return {
    id: fakeId(),
    personId,
    organisationId: orgId,
    messageId: fakeId(),
    readAt,
    archivedAt: null,
    archive: null,
    createdAt: faker.date.past(readAt ? { refDate: readAt } : undefined).getTime(),
    title: faker.lorem.sentence({ min: 3, max: 10 }),
    body: `<p>${faker.lorem.sentence()}</p>`,
    category: 'OrganisationLevel',
    bespokeNotificationId: null
  }
}

const generateMessagesPayload = (orgId, personId, numMessages) => {
  const notifications = Array.from({ length: numMessages }, () =>
    createMessageMock(orgId, personId)
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

  let messageCount = 0
  if (orgId !== 3333333333 && personId !== 11111120) {
    messageCount = faker.number.int({ min: 0, max: 10 })
  }

  const messagesPayload = generateMessagesPayload(orgId, personId, messageCount)
  businessPersonMessages[`${orgId}-${personId}`] = messagesPayload
  return messagesPayload
}
