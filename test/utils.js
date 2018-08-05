const test = require('ava')
const utils = require('../utils')

test('mapKeysWith / map object keys with mapping object', async t => {
  const data = { a: 1, b: 2, c: 3 }
  const mapping = { a: 'd', b: 'e', c: 'f' }
  const actual = utils.mapKeysWith(data, mapping)
  t.deepEqual(actual, { d: 1, e: 2, f: 3 })
})
