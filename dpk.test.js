const crypto = require('crypto')
const { deterministicPartitionKey } = require('./dpk')

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe('0')
  })

  test('should return partitionKey if provided and within the allowed length', () => {
    const event = {
      partitionKey: 'testPartitionKey',
    }

    expect(deterministicPartitionKey(event)).toBe('testPartitionKey')
  })

  test('should hash the partitionKey if its length exceeds the allowed length', () => {
    const longPartitionKey = 'a'.repeat(257)
    const event = {
      partitionKey: longPartitionKey,
    }

    const hashedKey = crypto.createHash('sha3-512').update(longPartitionKey).digest('hex')
    expect(deterministicPartitionKey(event)).toBe(hashedKey)
  })

  test('should hash the event when the partitionKey is not provided', () => {
    const event = {
      id: 1,
      type: 'test_event',
    }

    const hashedEvent = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
    expect(deterministicPartitionKey(event)).toBe(hashedEvent)
  })

  test('should hash the non-string event when the partitionKey is not provided', () => {
    const event = 42

    const hashedEvent = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
    expect(deterministicPartitionKey(event)).toBe(hashedEvent)
  })
})
