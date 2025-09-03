import { applyUpdates } from '../../../src/utils/applyUpdates.js'

describe('applyUpdates', () => {
  it('applies updates with coercion', () => {
    const schema = { name: { type: 'string', default: null } }
    const obj = { name: 'Alice' }
    const update = { name: true }

    const result = applyUpdates(schema, obj, update)

    expect(result).toEqual({ name: 'true' })
  })

  it('falls back to default when no update', () => {
    const schema = {
      active: { type: 'boolean', default: false },
      score: { type: 'number', default: 0 }
    }
    const obj = { active: true, score: 42 }
    const update = {}

    const result = applyUpdates(schema, obj, update)

    expect(result).toEqual({ active: false, score: 0 })
  })

  it('copies unknown keys unchanged', () => {
    const schema = { age: { type: 'number', default: null } }
    const obj = { id: 123, age: 45 }
    const update = { age: '99' }

    const result = applyUpdates(schema, obj, update)

    expect(result).toEqual({ id: 123, age: 99 })
  })

  it('handles nested objects with schema', () => {
    const schema = {
      profile: {
        name: { type: 'string', default: null },
        verified: { type: 'boolean', default: false }
      }
    }
    const obj = { profile: { name: 'Bob', verified: true } }
    const update = { profile: { name: 123 } }

    const result = applyUpdates(schema, obj, update)

    expect(result).toEqual({ profile: { name: '123', verified: false } })
  })
})
