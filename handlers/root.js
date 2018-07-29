const { parse: parseUrl } = require('url')
const { send } = require('micro')
const flatten = require('lodash.flatten')
const mapKeys = require('lodash.mapkeys')
const { hotpepper, gurunavi } = require('../externals')
const uniqRestraunts = require('../uniq-restraunts')

module.exports = async (req, res) => {
  const { query } = parseUrl(req.url, true)
  try {
    const results = await Promise.all([
      hotpepper(query),
      gurunavi(query),
    ])
    const ret = uniqRestraunts(
      flatten(results)
    )
    send(res, 200, ret)
  } catch (e) {
    send(res, e.statusCode, { ...e.properties, error: e.message })
  }
}
