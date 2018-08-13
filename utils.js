const querystring = require('querystring')
const mapKeys = require('lodash.mapkeys')

module.exports.mapKeysWith = (object, map) => mapKeys(object, (v, k) => map[k] || k)

module.exports.stringifyParams = params => {
  const s = querystring.stringify(params)
  return s.length > 0 ? `?${s}` : s
}
