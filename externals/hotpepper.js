const querystring = require('querystring')
const fetch = require('node-fetch')

const ENDPOINT = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
const BASE_QUERIES = {
  key: process.env.HOTPEPPER_API_KEY,
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
