const { router, get } = require('microrouter')
const rootHandler = require('./handlers/root')
const notfound = require('./handlers/notfound')

require('dotenv').config()

module.exports = router(
  get('/', rootHandler),
  get('/*', notfound)
)
