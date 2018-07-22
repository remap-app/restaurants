const { send } = require('micro')
const status = require('statuses')

module.exports = (req, res) => send(res, 404, { error: status[404] })
