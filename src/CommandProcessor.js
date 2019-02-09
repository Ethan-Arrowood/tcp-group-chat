const assert = require('assert')
const IterableCollection = require('./IterableCollection')

const _CommandProcessor = {
  chat (coll, index, args) {
    assert(typeof args[0] === 'string', 'args[0] must be a string')

    for (let { c, i } of coll) {
      if (i !== index) c.write(`Client ${index}: ${args[0].trim()}\n`)
    }
  },
  connect () {},
  disconnect () {},
  help () {},
  list () {},
  login () {},
  logout () {}
}

const CommandProcessor = new Proxy(_CommandProcessor, {
  get (o, p) {
    if (o.hasOwnProperty(p)) {
      return function (coll, index, args) {
        assert(coll instanceof IterableCollection, 'coll argument must be an instance of IterableCollection')
        assert(typeof index === 'number', 'index argument must be a number')
        assert(Array.isArray(args), 'args argument must be an Array')
        return o[p](coll, index, args)
      }
    } else {
      return () => {
        console.log(`Unknown command: ${p}`)
      }
    }
  }
})

module.exports = CommandProcessor
