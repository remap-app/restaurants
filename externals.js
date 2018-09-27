const { STATUS_CODES } = require('http')
const got = require('got')
const { createError } = require('micro-errors')
const cacheStore = require('./cache-store')
const { mapKeysWith, stringifyParams } = require('./utils')
const { normalizeRestaurants, normalizeNullValues } = require('./helpers')
const { hotpepper: hotpepperParamsMap, gurunavi: gurunaviParamsMap } = require('./params-map')
const { hotpepper: hotpepperEntityMap, gurunavi: gurunaviEntityMap } = require('./entity-map')

const request = async (url, params) => {
  return await got(`${url}${stringifyParams(params)}`, { json: true, cache: cacheStore, throwHttpErrors: false })
    .catch(error => {
      const codeAndTitle = error.name === 'ParseError'
        ? [500, STATUS_CODES[500]]
        : [error.statusCode, error.statusMessage]

      throw createError(...codeAndTitle, error, null, { name: error.name })
    })
}

module.exports.hotpepper = async params => {
  const res = await request('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
    ...mapKeysWith(params || {}, hotpepperParamsMap),
    key: process.env.HOTPEPPER_API_KEY,
    format: 'json',
  })

  const { body } = res

  if (typeof body === 'string' && body.length === 0) { // TODO:
    throw createError(404, STATUS_CODES[404], null, null, { _debug: { external: 'HOTPEPPER', message: '`response.body` is empty string' } })
  }

  const { results } = body

  if (Array.isArray(results.error)) {
    const [error] = results.error
    const statusCode = { '3000': 400, '2000': 401, '1000': 500 }[error.code]
    throw createError(
      statusCode,
      STATUS_CODES[statusCode],
      null,
      null,
      { detail: error.message }
    )
  }

  return normalizeRestaurants(results.shop, hotpepperEntityMap)
}

module.exports.gurunavi = async params => {
  const res = await request('https://api.gnavi.co.jp/RestSearchAPI/v3/', {
    ...mapKeysWith(params || {}, gurunaviParamsMap),
    keyid: process.env.GURUNAVI_API_KEY,
  })

  const { statusCode, body } = res

  if (
    (statusCode >= 200 && statusCode < 300) ||
    statusCode === 404
  ) {
    const restaurants = body.rest || [] // if 404
    return normalizeRestaurants(
      normalizeNullValues(restaurants),
      gurunaviEntityMap
    )
  }

  const [error] = body.error
  const code = { '601': 401, '602': 404, '603': 400, '604': 500 }[error.code] || error.code
  throw createError(
    code,
    res.statusMessage,
    null,
    null,
    { detail: error.message }
  )
}
