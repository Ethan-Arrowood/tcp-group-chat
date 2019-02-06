const net = require('net')

const clientInstColl = {
  _i: 0,
  add: function (c) {
    const i = this._i++ // get index and increment for next add call
    this[i] = c // assign client socket instance to collection

    console.log(`client ${i} connected`)

    c.on('data', buf => {
      const data = buf.toString()
      if (data.match(/^(chat:)/)) {
        sendMessage(data.substring(6))
      }
    })

    c.on('end', () => {
      console.log(`client ${i} disconnected`)
      this.remove(i) // delete self from collection
    })
  },
  remove: function (i) {
    delete this[i]
  }
}

function sendMessage (str) {
  for (let i = 0; i < clientInstColl._i; i++) {
    if (clientInstColl.hasOwnProperty(i)) {
      clientInstColl[i].write(str)
    }
  }
}

const server = net.createServer()

server.on('connection', client => {
  clientInstColl.add(client)

  client.write(`Hello client!\n`)

  // client.pipe(client) // echo
})

server.on('error', err => {
  throw err
})

server.listen(8124, () => {
  console.log('server bound')
})
