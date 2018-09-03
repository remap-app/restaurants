const mapObj = require('map-obj')
const uniqWith = require('lodash.uniqwith')
const get = require('lodash.get')
const isPlainObject = require('lodash.isplainobject')
const isString = require('lodash.isstring')
const isEmpty = require('lodash.isempty')
const head = require('lodash.head')

module.exports.uniqRestaurants = restaurants => uniqWith(restaurants, (a, b) => {
  const aLat = a && (a.lat || a.latitude)
  const aLng = a && (a.lng || a.longitude)
  const bLat = b && (b.lat || b.latitude)
  const bLng = b && (b.lng || b.longitude)
  return aLat === bLat && aLng === bLng
})

const isHotpepper = module.exports.isHotpepper = id => /^J\d{9}$/.test(id)

const isGurunavi = module.exports.isGurunavi = id => /^[a-zA-z0-9]{7}$/.test(id)

const truthy = v => !!v

const mapEntity = (entity, map) => {
  return Object.entries(map).reduce(
    (ret, [key, value]) => {
      let resultVal = null

      if (value === true) {
        const path = key
        resultVal = get(entity, path, null)
      } else if (typeof value === 'string') {
        const result = value.split(',').map(path => get(entity, path, ''))
        resultVal = result.length === 1
          ? head(result)
          : result.filter(truthy).join(' ')
      } else if (Array.isArray(value)) {
        resultVal = value.map(path => get(entity, path, null)).filter(truthy)
      } else if (isPlainObject(value)) {
        resultVal = Object.entries(value).reduce(
          (ret, [k, path]) => ({ ...ret, [k]: get(entity, path, null) }),
          {}
        )
      }

      return { ...ret, [key]: resultVal }
    },
    {}
  )
}

const mapEntities = (entities, map) => {
  return entities.map(entity => mapEntity(entity, map))
}

module.exports.normalizeRestaurants = (restaurants, map) => {
  return Array.isArray(restaurants)
    ? mapEntities(restaurants, map)
    : mapEntity(restaurants, map)
}

const normalizeNullValue = object => {
  return mapObj(
    object,
    (key, value) => (isString(value) && isEmpty(value)) ? [key, null] : [key, value],
    { deep: true }
  )
}

module.exports.normalizeNullValues = restaurants => {
  return Array.isArray(restaurants)
    ? restaurants.map(normalizeNullValue)
    : normalizeNullValue(restaurants)
}

const pickIdsWith = (ids, comparator, delimiter = ',') => {
  return ids.split(delimiter).filter(comparator).join(delimiter)
}

module.exports.pickHotpepperIds = ids => pickIdsWith(ids, isHotpepper)

module.exports.pickGurunaviIds = ids => pickIdsWith(ids, isGurunavi)
