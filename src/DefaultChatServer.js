const net = require('net')
const ClientCollection = require('./ClientCollection')

module.exports = function DefaultChatServer () {
  const server = net.createServer()
  const coll = new ClientCollection()

  server.on('connection', client => {
    coll.add(client)
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
