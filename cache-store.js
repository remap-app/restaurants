const Keyv = require('keyv')
const KeyvRedis = require('@keyv/redis')
const ms = require('ms')

const { NODE_ENV, CACHE_DATABASE_PASSWORD, CACHE_DATABASE_HOSTNAME, CACHE_DATABASE_PORT } = process.env

const HOSTNAME = NODE_ENV === 'production'
  ? `:${CACHE_DATABASE_PASSWORD}@${CACHE_DATABASE_HOSTNAME}`
  : CACHE_DATABASE_HOSTNAME

const store = new Keyv({ store: new KeyvRedis(`redis://${HOSTNAME}:${CACHE_DATABASE_PORT}`), ttl: ms('1d') })

module.exports = store
