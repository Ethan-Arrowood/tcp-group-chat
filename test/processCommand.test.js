/* global test expect */
// const net = require('net')
const { processCommand } = require('../src/server')

test('processCommand is an object', () => {
  expect(typeof processCommand).toBe('object')
})
