const { STATUS_CODES } = require('http')
const { parse: parseUrl } = require('url')
const { send } = require('micro')
const { createError } = require('micro-errors')
const flatten = require('lodash.flatten')
const { hotpepper, gurunavi } = require('../externals')
const { uniqRestaurants, pickHotpepperIds, pickGurunaviIds } = require('../helpers')

const createQuery = url => {
  const { query } = parseUrl(url, true)
  if (query.id) return query
  return Object.assign({ range: 1, page: 1, per_page: 10 }, query)
}

const externals = [
  {
    request: hotpepper,
    baseQuery: { datum: 'world' },
    locationQuery: null,
    idPicker: pickHotpepperIds,
  },
  {
    request: gurunavi,
    baseQuery: { coordinates_mode: 2 },
    locationQuery: { input_coordinates_mode: 2 },
    idPicker: pickGurunaviIds,
  },
]

module.exports = async (req, res) => {
  const query = createQuery(req.url)

  const requestPromises = externals.reduce(
    (ret, { request, baseQuery, locationQuery, idPicker }) => {
      if (!query.id) return [...ret, request({ ...query, ...baseQuery, ...locationQuery })]

      const id = idPicker(query.id)
      if (id) {
        return [...ret, request({ ...query, ...baseQuery, id })]
      }

      return ret
    },
    []
  )

  if (requestPromises.length === 0) {
    throw createError(404, STATUS_CODES[404])
  }

  const results = await Promise.all(requestPromises).catch(error => { throw error })

  const ret = uniqRestaurants(
    flatten(results)
  )
  send(res, 200, ret)
}
