const querystring = require('querystring')
const fetch = require('node-fetch')
const createError = require('http-errors')
const mapParamsKeys = require('./map-params-keys')

const stringifyParams = params => {
  const s = querystring.stringify(params)
  return s.length > 0 ? `?${s}` : s
}

const request = module.exports.request = async (url, params) => {
  const res = await fetch(`${url}${stringifyParams(params)}`)
  if (res.ok) {
    return await res.json()
  }
  throw createError(res.status, res.statusText)
}

module.exports.hotpepper = async params => {
  const { results } = await request('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
    start: 1, // page
    count: 10, // per_page
    range: 1,
    ...mapParamsKeys(params || {}, {
      latitude: 'lat',
      longitude: 'lng',
      page: 'start',
      per_page: 'count',
    }),
    key: process.env.HOTPEPPER_API_KEY,
    format: 'json',
    datum: 'world',
  })
  if (Array.isArray(results.error)) {
    const [error] = results.error
    throw createError({ '3000': 400, '2000': 401, '1000': 500 }[error.code], error.message)
  }
  return results.shop
}

module.exports.gurunavi = async params => {
  const res = await request('https://api.gnavi.co.jp/RestSearchAPI/20150630/', {
    offset_page: 1, // page
    hit_per_page: 10, // per_page
    range: 1,
    ...mapParamsKeys(params || {}, {
      page: 'offset_page',
      per_page: 'hit_per_page',
    }),
    keyid: process.env.GURUNAVI_API_KEY,
    format: 'json',
    input_coordinates_mode: 2, // 世界測地系
    coordinates_mode: 2, // 世界測地系
  })
  if (res.error) {
    throw createError({ '600': 404, '601': 401, '602': 404, '603': 400, '604': 500 }[error.code] || error.code, error.message)
  }
  return res.rest
}
