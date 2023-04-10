const crypto = require('crypto')

const TRIVIAL_PARTITION_KEY = '0'
const MAX_PARTITION_KEY_LENGTH = 256

/**
 * Hash the given data using the sha3-512 algorithm.
 * @param {string} data - The data to be hashed.
 * @returns {string} - The resulting hashed data.
 */
function hashData(data) {
  return crypto.createHash('sha3-512').update(data).digest('hex')
}

/**
 * Ensure that the input candidate is a string.
 * @param {*} candidate - The value to be converted into a string.
 * @returns {string} - The resulting string.
 */
function ensureIsString(candidate) {
  if (typeof candidate !== 'string') {
    return JSON.stringify(candidate)
  }
  return candidate
}

/**
 * Truncate the input candidate to the maximum allowed length by hashing it if necessary.
 * @param {string} candidate - The input candidate to be truncated.
 * @returns {string} - The truncated or hashed candidate.
 */
function truncateToMaxLength(candidate) {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return hashData(candidate)
  }
  return candidate
}

/**
 * Generate a deterministic partition key for the given event.
 * @param {Object} event - The event for which the partition key is to be generated.
 * @returns {string} - The generated partition key.
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY

  const candidate = event.partitionKey ? event.partitionKey : hashData(ensureIsString(event))

  return truncateToMaxLength(candidate)
}
