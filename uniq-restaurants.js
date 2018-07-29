const uniqWith = require('lodash.uniqwith')

module.exports = restaurants => uniqWith(restaurants, (a, b) => {
  const aLat = a && (a.lat || a.latitude)
  const aLng = a && (a.lng || a.longitude)
  const bLat = b && (b.lat || b.latitude)
  const bLng = b && (b.lng || b.longitude)
  return aLat === bLat && aLng === bLng
})
