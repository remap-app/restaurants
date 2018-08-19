require('dotenv').config()

const { STATUS_CODES } = require('http')
const { router, get } = require('microrouter')
const compose = require('micro-compose')
const { handleErrors, createError } = require('micro-errors')
const cors = require('micro-cors-multiple-allow-origin')
const UrlPattern = require('url-pattern')
const rootHandler = require('./handlers/root')
const idHandler = require('./handlers/id')

module.exports = compose(
  handleErrors({ debug: process.env.NODE_ENV !== 'production' }),
  cors({
    allowMethods: ['GET', 'OPTIONS'],
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  })
)(
  router(
    get('/', rootHandler),
    get(new UrlPattern(/^\/([\w-]+)$/, ['id']), idHandler),
    get('/*', () => {
      throw createError(404, STATUS_CODES[404])
    })
  )
)
