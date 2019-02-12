const net = require('net')
const assert = require('assert')

class ChatClient {
  constructor () {
    this.socket = new net.Socket()

    this.socket.on('data', buf => {
      console.log(buf.toString())
    })

    this.input = process.stdin
  }

  start () {
    console.log('Welcome to TCP Group Chat\nAuthored by Ethan Arrowood')
    console.log('Enter \'server <hostname> <port>\' to connect to a chat server')

    this.input.once('data', buf => {
      const data = buf.toString()

      // RegExp for server <hostname> <port> command; remember hostname and port
      const rx = new RegExp('^server\\s+(.*)\\s+(\\d+)')
      const res = rx.exec(data)
      if (res === null) {
        // try again
        console.log('Bad command')
        process.exit(1)
      }
      const [ , command, hostname = '::', _port = '8124', ...args ] = res // eslint-disable-line no-unused-vars
      const port = parseInt(_port)
      if (command.toLowerCase() === 'server' && hostname && _port) {
        assert(net.isIP(hostname) !== 0, 'hostname must be a valid ip')
        assert(Number.isInteger(port), 'port must be an integer')
        this.socket.connect(port, hostname, () => this.initialize())
      }
    })
  }

  initialize () {
    this.input.on('data', buf => {
      this.socket.write(buf)
    })
  }
}

module.exports = ChatClient

const c = new ChatClient()
c.start()
