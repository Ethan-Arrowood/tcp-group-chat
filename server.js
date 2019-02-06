const net = require('net')

let clientIndexIterator = 0
const clientMap = {}

/**
 * Add client socket connection event handlers
 * @param {net.Socket} client
 */
function addClientEventHandlers (client, index) {
  client.on('end', () => {
    console.log(`client ${index} disconnected`)
    delete clientMap[index]
  })
}

function getClientIndex () {
  return clientIndexIterator++
}

const server = net.createServer()

server.on('connection', client => {
  const clientIndex = getClientIndex()

  clientMap[clientIndex] = client
  addClientEventHandlers(client, clientIndex)
  console.log(`client ${clientIndex} connected`)
  client.write(`You are client ${clientIndex}`)

  client.pipe(client) // echo
})

server.on('error', err => {
  throw err
})

server.listen(8124, () => {
  console.log('server bound')
})
