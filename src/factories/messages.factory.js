import { fakeId, faker, nullOrFake, safeSeed } from './common.js'
import { orgIdToSbi, personIdToOrgIds, staticPersonData, orgIdLookup } from './id-lookups.js'

const businessPersonMessages = {}
const maxYearsInPast = 4

const createMessageMock = (orgId, personId, overrides = {}) => {
  const archivedAt = nullOrFake(
    () => Number.parseInt(faker.date.past(maxYearsInPast).getTime() / 1000) * 1000
  )

  const readAt = nullOrFake(
    () => Number.parseInt(faker.date.past(maxYearsInPast).getTime() / 1000) * 1000
  )

  const message = {
    id: fakeId(),
    personId,
    organisationId: orgId,
    messageId: fakeId(),
    readAt,
    archivedAt,
    archive: archivedAt === null ? null : !!archivedAt,
    createdAt: faker.date.past(readAt ? { refDate: readAt } : undefined).getTime(),
    title: faker.lorem.sentence({ min: 3, max: 10 }),
    body: `<p>${faker.lorem.sentence()}</p>`,
    category: 'OrganisationLevel',
    bespokeNotificationId: null,
    ...overrides
  }
  return message
}

const generateMessagesPayload = (orgId, personId, overrides = null) => {
  const notifications = Array.from(
    overrides ?? Array(faker.number.int({ min: 0, max: 10 })),
    (messageOverrides) => createMessageMock(orgId, personId, messageOverrides)
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

  const { sbi, ...overrides } = orgIdLookup[orgId] ?? {}

  let messagesPayload
  messagesPayload = generateMessagesPayload(
    orgId,
    personId,
    overrides.customers?.find((c) => personId === c?.personId).messages
  )
  businessPersonMessages[`${orgId}-${personId}`] = messagesPayload
  return messagesPayload
}
