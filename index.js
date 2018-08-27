require('dotenv').config()

const { router, get } = require('microrouter')
const compose = require('micro-compose')
const { handleErrors } = require('micro-errors')
const cors = require('micro-cors-multiple-allow-origin')
const UrlPattern = require('url-pattern')
const getList = require('./routes/getList')
const getById = require('./routes/getById')

module.exports = compose(
  handleErrors({ debug: process.env.NODE_ENV !== 'production' }),
  cors({
    allowMethods: ['GET', 'OPTIONS'],
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  })
)(
  router(
    get('/', getList),
    get(new UrlPattern(/^\/([\w-]+)$/, ['id']), getById)
  )
)
