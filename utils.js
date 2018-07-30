const mapKeys = require('lodash.mapkeys')
module.exports.mapKeysWith = (object, map) => mapKeys(object, (v, k) => map[k] || k)
