const { parse: parseUrl } = require('url')
const { send } = require('micro')
const flatten = require('lodash.flatten')
const { hotpepper, gurunavi } = require('../externals')
const { uniqRestaurants } = require('../helpers')

module.exports = async (req, res) => {
  const query = { page: 1, per_page: 10, range: 1, ...parseUrl(req.url, true).query }
  const results = await Promise.all([
    hotpepper({ ...query, datum: 'world' }),
    gurunavi({ ...query, input_coordinates_mode: 2, coordinates_mode: 2 }),
  ])
  .catch(error => {
    throw error
  })

  if (results) {
    const ret = uniqRestaurants(
      flatten(results)
    )
    send(res, 200, ret)
  }
}
