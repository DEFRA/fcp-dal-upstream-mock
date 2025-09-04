function coerceType(type, value) {
  switch (type) {
    case 'string':
      return String(value)
    case 'boolean':
      return Boolean(value)
    case 'number':
      return Number(value)
    default:
      return value
  }
}

export const applyUpdates = (updateSchema, obj, update = {}) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const updateSchemaDef = updateSchema?.[key]
      const updateValue = update[key]

      // If value is an object, recurse
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return [key, applyUpdates(updateSchemaDef, value, updateValue ?? {})]
      }

      // If field is not in update schema, keep original value
      if (!updateSchemaDef) {
        return [key, value]
      }

      // If update value is missing, use schema default
      if (updateValue === undefined) {
        return [key, updateSchemaDef.default]
      }

      // If update value is explicitly null, keep it as null
      if (updateValue === null) {
        return [key, null]
      }

      // Otherwise coerce update value
      return [key, coerceType(updateSchemaDef.type, updateValue)]
    })
  )
}
