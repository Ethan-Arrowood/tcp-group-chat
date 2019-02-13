const assert = require('assert')
const IterableCollection = require('./IterableCollection')

function getUsername (coll, index) {
  const client = coll[index]
  return client.hasOwnProperty('username') ? client.username : `Client ${index}`
}

const _CommandProcessor = {
  chat (coll, index, args) {
    assert(typeof args[0] === 'string', 'message must be a string')
    const username = getUsername(coll, index)
    for (let { c, i } of coll) {
      if (i !== index) c.write(`${username}: ${args[0].trim()}\n`)
    }
  },
  connect () {},
  disconnect () {},
  echo (coll, index, args) {
    assert(typeof args[0] === 'string', 'message must be a string')
    const username = getUsername(coll, index)
    coll[index].write(`${username} echo: ${args[0].trim()}\n`)
  },
  help () {},
  list (coll, index, args) {
    let users = 'Users: '
    for (let { i } of coll) {
      if (i !== index) users += `${getUsername(coll, i)} `
    }
    coll[index].write(users + '\n')
  },
  login (coll, index, args) {
    const username = args[0].trim()
    Object.defineProperty(coll[index], 'username', {
      value: username,
      configurable: true,
      enumerable: true
    })
    coll[index].write(`Logged in to user: ${username}\n`)
  },
  logout (coll, index, args) {
    const client = coll[index]
    if (client.hasOwnProperty('username')) {
      const username = client.username
      delete client.username
      client.write(`Logged out of user: ${username}\n`)
    } else {
      client.write('Cannot logout. Login first\n')
    }
  }
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
