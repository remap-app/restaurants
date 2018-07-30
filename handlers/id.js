const { parse: parseUrl } = require('url')
const { send } = require('micro')
const status = require('statuses')
const head = require('lodash.head')
const { hotpepper, gurunavi } = require('../externals')
const { isHotpepper, isGurunavi } = require('../helpers')

module.exports = async (req, res) => {
  const { query } = parseUrl(req.url, true)
  const { id } = req.params
  const endpoint = isHotpepper(id) ? hotpepper : (isGurunavi(id) ? gurunavi : null)
  if (!endpoint) {
    send(res, 404, { error: status[404] })
    return
  }
  try {
    const result = await endpoint({ ...query, id })
    const ret = Array.isArray(result) ? head(result) : result
    if (!ret) {
      send(res, 404, { error: status[404] })
      return
    }
    send(res, 200, ret)
  } catch (e) {
    send(res, e.statusCode, { ...e.properties, error: e.message })
  }
}
