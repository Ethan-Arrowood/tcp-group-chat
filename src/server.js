const net = require('net')

/**
 * processCommand is an object that returns functions
 * to be used when a client socket connection receives
 * data. It is called via the 'data' event handler.
 *
 * @namespace processCommand
 */
class _ProcessCommand {
  constructor (clientInstanceCollection) {
    this.clientInstanceCollection = clientInstanceCollection
  }
  /**
   * This method broadcasts a message to all other nodes
   * connected to the TCP server
   *
   * @memberof processCommand
   * @method chat
   */
  chat (index, args) {
    for (let { c, i } of this.clientInstanceCollection) {
      if (i !== index) c.write(`Client ${index}: ${args[0].trim()}\n`)
    }
  }
  connect () {}
  disconnect () {}
  help () {}
  list () {}
  login () {}
  logout () {}
}

const ProcessCommand = new Proxy(_ProcessCommand, {
  /**
   * Default command handler. This function is implemented
   * as an ES6 Proxy get trap. If the prop argument (p) does not
   * match one existing on processCommand it will return a console
   * log statement wrapped in a noop function.
   *
   * @memberof processCommand
   * @method default
   */
  get: (o, p) => {
    return o.hasOwnProperty(p)
      ? o[p]
      : () => { console.log(`Unknown command: ${p}`) }
  }
})

class ClientInstanceCollection {
  constructor () {
    this._i = 0
    this.processCommand = new ProcessCommand(this)
  }

  length () {
    return this._i
  }

  add (c) {
    const i = this._i++ // get index and increment for next add call
    this[i] = c // assign client socket instance to collection

    console.log(`client ${i} connected`)

    c.on('data', buf => {
      const data = buf.toString()
      const [ , command, ...args ] = data.match(/^(\w+)(.*)/)
      this.processCommand[command](i, args)
    })

    c.on('end', () => {
      console.log(`client ${i} disconnected`)
      this.remove(i) // delete self from collection
    })
  }

  remove (i) {
    delete this[i]
  }

  * [Symbol.iterator] () {
    let i = 0
    while (i < this._i) {
      if (this.hasOwnProperty(i)) yield { i, c: this[i++] }
    }
  }
}

function DefaultChatServer () {
  const server = net.createServer()
  const cic = new ClientInstanceCollection()

  server.on('connection', client => {
    cic.add(client)
    client.write(`Hello client!\n`)
    // client.pipe(client) // echo
  })

  server.on('error', err => {
    throw err
  })

  server.listen(8124, () => {
    console.log('server bound')
  })

  return server
}

module.exports = {
  ChatServer: DefaultChatServer,
  ClientInstanceCollection,
  ProcessCommand
}
