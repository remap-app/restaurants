const Keyv = require('keyv')
const KeyvRedis = require('@keyv/redis')
const ms = require('ms')

const { NODE_ENV, CACHE_DATABASE_PASSWORD, CACHE_DATABASE_URL } = process.env
const REDIS_URL = NODE_ENV === 'production'
  ? `redis://:${CACHE_DATABASE_PASSWORD}@${CACHE_DATABASE_URL}`
  : CACHE_DATABASE_URL

const store = new Keyv({ store: new KeyvRedis(REDIS_URL), ttl: ms('1d') })

module.exports = store
