const { parse: parseUrl } = require('url')
const { send } = require('micro')
const { hotpepper, gurunavi } = require('../externals')

module.exports = async (req, res) => {
  const { query } = parseUrl(req.url, true)
  try {
    const results = await Promise.all([
      hotpepper(query),
      gurunavi(query),
    ])
    send(res, 200, results)
  } catch (e) {
    send(res, e.statusCode, { ...e.properties, error: e.message })
  }
}
