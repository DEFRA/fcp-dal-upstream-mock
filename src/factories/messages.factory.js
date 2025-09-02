import { fakerEN_GB as faker } from '@faker-js/faker'
import { personIdToOrgIds } from '../factories/id-lookups.js'

const businessPersonMessages = {}

const createMessageMock = () => ({
  id: +faker.string.numeric(7),
  personId: +faker.string.numeric(7),
  organisationId: +faker.string.numeric(7),
  messageId: +faker.string.numeric(7),
  readAt: faker.datatype.boolean() ? faker.date.anytime().getDate() * 1000 : null,
  archivedAt: null,
  archive: null,
  createdAt: +faker.string.numeric(13),
  title: faker.lorem.sentence(10),
  body: `<p>${faker.lorem.sentence()}</p>`,
  category: 'OrganisationLevel',
  bespokeNotificationId: null
})

const generateMessagesPayload = (numMessages) => {
  const notifications = Array.from({ length: numMessages }, () => createMessageMock())

  return {
    notifications,
    resultCount: notifications.length,
    readCount: notifications.filter((n) => n.readAt).length,
    unreadCount: notifications.filter((n) => !n.readAt).length
  }
}

export const retrieveMessages = (orgId, personId) => {
  // check person exists and org is related to the person
  // Very strangely the upstream returns a succesful response if they don't exist
  const orgIds = personIdToOrgIds[personId]
  if (!orgIds || !orgIds.includes(orgId)) {
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
  faker.seed(orgId)
  faker.seed(personId)
  const messagesPayload = generateMessagesPayload(faker.number.int({ min: 0, max: 10 }))
  businessPersonMessages[`${orgId}-${personId}`] = messagesPayload
  return messagesPayload
}
