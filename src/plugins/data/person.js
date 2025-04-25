import files from '../../utils/files.js'

const { getJSON } = files(import.meta.url)

export const personById = (attributes = {}) => {
  if (attributes.customerReferenceNumber) {
    const personIdCrnMap = getJSON(
      '../../../fixtures/personId/personIdCrnMap.json'
    )
    attributes.id = personIdCrnMap[attributes.customerReferenceNumber]
  }
  return getJSON(`../../../fixtures/personId/${attributes.id}/detail.json`)
}
