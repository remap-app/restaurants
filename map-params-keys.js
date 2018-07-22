const mapKeys = require('lodash.mapkeys')

module.exports = (params, map) => mapKeys(params, (v, k) => map[k] || k)
