const querystring = require('querystring')
const fetch = require('node-fetch')
const createError = require('http-errors')

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
    key: process.env.HOTPEPPER_API_KEY,
    format: 'json',
    ...params,
  })
  if (Array.isArray(results.error)) {
    const [error] = results.error
    throw createError({ '3000': 400, '2000': 401, '1000': 500 }[error.code], error.message)
  }
  return results
}

module.exports.gurunavi = params => request('https://api.gnavi.co.jp/RestSearchAPI/20150630/', {
  keyid: process.env.GURUNAVI_API_KEY,
  format: 'json',
  ...params,
})
