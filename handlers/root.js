const { parse: parseUrl } = require('url')
const { send } = require('micro')
const hotpepper = require('../externals/hotpepper')
const gnavi = require('../externals/gnavi')

module.exports = async (req, res) => {
  const { query } = parseUrl(req.url, true)
  const results = await Promise.all([
    hotpepper(query),
    gnavi(query),
  ])
  send(res, 200, results)
}
