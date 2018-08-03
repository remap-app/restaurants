require('dotenv').config()

const { router, get, send } = require('microrouter')
const status = require('statuses')
const rootHandler = require('./handlers/root')
const idHandler = require('./handlers/id')

module.exports = router(
  get('/', rootHandler),
  get('/:id', idHandler),
  get('/*', (req, res) => send(res, 404, { error: status[404] }))
)
