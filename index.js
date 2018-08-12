require('dotenv').config()

const { router, get, send } = require('microrouter')
const compose = require('micro-compose')
const cors = require('micro-cors-multiple-allow-origin')
const status = require('statuses')
const rootHandler = require('./handlers/root')
const idHandler = require('./handlers/id')

module.exports = compose(
  cors({
    allowMethods: ['GET', 'OPTIONS'],
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  })
)(
  router(
    get('/', rootHandler),
    get('/:id', idHandler),
    get('/*', (req, res) => send(res, 404, { error: status[404], status: 404 }))
  )
)
