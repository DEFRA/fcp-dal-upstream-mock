function coerceValue(value, type) {
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

export function applyUpdates(schema, obj, update) {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    const schemaDef = schema?.[key]
    const updateVal = update?.[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = applyUpdates(schemaDef, value, updateVal || {})
    } else if (schemaDef) {
      result[key] =
        updateVal !== undefined ? coerceValue(updateVal, schemaDef.type) : schemaDef.default
    } else {
      result[key] = value
    }
  }

  return result
}
