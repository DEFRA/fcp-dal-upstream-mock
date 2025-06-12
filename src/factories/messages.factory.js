import { fakerEN_GB as faker } from '@faker-js/faker'

export const createMessageMock = (attributes = {}) => ({
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
  bespokeNotificationId: null,
  ...attributes
})
