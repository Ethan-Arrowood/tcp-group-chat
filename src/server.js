const net = require('net')

class _ProcessCommand {
  constructor (clientInstanceCollection) {
    this.clientInstanceCollection = clientInstanceCollection
  }
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
