const { STATUS_CODES } = require('http')
const got = require('got')
const { createError } = require('micro-errors')
const cacheStore = require('./cache-store')
const { mapKeysWith, stringifyParams } = require('./utils')
const { normalizeRestaurants, normalizeNullValues } = require('./helpers')
const { hotpepper: hotpepperParamsMap, gurunavi: gurunaviParamsMap } = require('./params-map')
const { hotpepper: hotpepperEntityMap, gurunavi: gurunaviEntityMap } = require('./entity-map')

const request = module.exports.request = async (url, params) => {
  const response = await got(`${url}${stringifyParams(params)}`, { json: true, cache: cacheStore })
    .catch(error => {
      const codeAndTitle = error.name === 'ParseError'
        ? [500, STATUS_CODES[500]]
        : [error.statusCode, error.statusMessage]

      throw createError(...codeAndTitle, error, { name: error.name })
    })

  return response.body
}

module.exports.hotpepper = async params => {
  const { results } = await request('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
    ...mapKeysWith(params || {}, hotpepperParamsMap),
    key: process.env.HOTPEPPER_API_KEY,
    format: 'json',
  })

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
  const res = await request('https://api.gnavi.co.jp/RestSearchAPI/20150630/', {
    ...mapKeysWith(params || {}, gurunaviParamsMap),
    keyid: process.env.GURUNAVI_API_KEY,
    format: 'json',
  })

  if (res.error) {
    const { error } = res
    const statusCode = { '600': 404, '601': 401, '602': 404, '603': 400, '604': 500 }[error.code] || error.code
    throw createError(
      statusCode,
      STATUS_CODES[statusCode],
      null,
      null,
      { detail: error.message }
    )
  }

  return normalizeRestaurants(
    normalizeNullValues(res.rest),
    gurunaviEntityMap
  )
}
