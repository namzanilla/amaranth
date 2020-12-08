// const mongoose = require('mongoose')

/**
 * returns assembled positive response (actual version)
 * @param {string} [service] service that send response
 * @param {string} [payload] response text
 */

const posResponse = async (service, payload, data) => ({
  error: false,
  service: `${service}`,
  message: `${payload}`,
  data
})

/**
 * returns assembled negative response (actual version)
 * @param {string} [service] service that send response
 * @param {string} [payload] response text
 */
const negResponse = async (service, payload, err) => {
  const resp = {
    error: true,
    service: `${service}`,
    message: `${payload}`,
    err: `${err}`
  }
  if (!err) delete resp.err
  return resp
}

/**
 * returns assembled 'field missing' response
 * @param {string} [serviceName] service that send response
 * @param {string} [fieldName] filed name that missing
 */
const fieldMissingResponse = async (res, serviceName, fieldName) => {
  res.status(400).send(await negResponse(serviceName, `Required field is missing: ${fieldName}`))
}

/**
 * returns assembled 'field missing' response (actual version)
 * @param {string} [serviceName] service that send response
 * @param {string} [fieldName] filed name that missing
 */
const missResponse = async (serviceName, fieldName) => ({
  error: true,
  service: `${serviceName}`,
  response: `Required field is missing: ${fieldName}.`
})

/**
 * returns assembled 'field is not valid' response (actual version)
 * @param {string} [serviceName] service that send response
 * @param {string} [fieldName] filed name that missing
 */
const isNotValid = async (serviceName, fieldName) => ({
  error: true,
  service: `${serviceName}`,
  response: `Field '${fieldName}' is not valid.`
})

/**
 * Not Found
 */
const notFound = async (res, serviceName, payload) => {
  res.status(400).send(await negResponse(serviceName, payload))
}

const isNotFound = async (serviceName, entityName, id) => ({
  error: true,
  service: `${serviceName}`,
  response: `${entityName} '${id}' was not found.`
})

/**
 * check if payload is valid mongoose id
 * @param {string} [payload] id
 */
// const isValid = async (payload) => mongoose.Types.ObjectId.isValid(payload)

module.exports = {
  posResponse,
  negResponse,
  fieldMissingResponse,
  notFound,
  // isValid,
  missResponse,
  isNotValid,
  isNotFound
}
