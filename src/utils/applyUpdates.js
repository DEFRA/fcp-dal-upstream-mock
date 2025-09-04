export const applyUpdates = (schema, obj, update = {}) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const schemaDef = schema?.[key]
      const updateVal = update[key]
      return [
        key,
        value && typeof value === 'object' && !Array.isArray(value)
          ? applyUpdates(schemaDef, value, update[key] ?? {})
          : schemaDef
            ? updateVal !== undefined
              ? updateVal == null
                ? updateVal
                : ({ string: String, boolean: Boolean, number: Number }[schemaDef.type]?.(
                    updateVal
                  ) ?? updateVal)
              : schemaDef.default
            : value
      ]
    })
  )
