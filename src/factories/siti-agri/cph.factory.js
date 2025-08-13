import { fakerEN_GB as faker } from '@faker-js/faker'

export const createCHPs = (attributes = {}) => ({
  cphNumber: faker.string.alphanumeric(),
  parcelNumbers: [
    faker.string.alphanumeric(),
    faker.string.alphanumeric(),
    faker.string.alphanumeric()
  ],
  ...attributes
})

export const createCHPInfo = (attributes = {}) => ({
  cphNumber: faker.string.alphanumeric(),
  parish: faker.string.alphanumeric(),
  startDate: faker.date.anytime().getDate() * 1000,
  expiryDate: faker.date.anytime().getDate() * 1000,
  species: [faker.string.alphanumeric().toUpperCase()],
  xCoordinate: faker.number.int({ max: 216000, min: 116000 }),
  yCoordinate: faker.number.int({ max: 621000, min: 236000 }),
  ...attributes
})
