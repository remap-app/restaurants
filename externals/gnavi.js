const querystring = require('querystring')
const fetch = require('node-fetch')

const ENDPOINT = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/'
const BASE_QUERIES = {
  keyid: process.env.GURUNAVI_API_KEY,
  format: 'json',
}

module.exports = async params => {
  try {
    const res = await fetch(`${ENDPOINT}?${querystring.stringify({ ...BASE_QUERIES, ...params })}`)
    return await res.json()
  } catch (e) {
    throw e
  }
}
