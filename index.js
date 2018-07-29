require('dotenv').config()

const { router, get } = require('microrouter')
const rootHandler = require('./handlers/root')
const idHandler = require('./handlers/id')
const notfound = require('./handlers/notfound')

module.exports = router(
  get('/', rootHandler),
  get('/:id', idHandler),
  get('/*', notfound)
)
