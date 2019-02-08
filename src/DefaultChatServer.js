const net = require('net')
const ClientInstanceCollection = require('./ClientInstanceCollection')

module.exports = function DefaultChatServer () {
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
