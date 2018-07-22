require('dotenv').config()

const { router, get } = require('microrouter')
const rootHandler = require('./handlers/root')
const notfound = require('./handlers/notfound')

module.exports = router(
  get('/', rootHandler),
  get('/*', notfound)
)
