const CommandProcessor = require('./CommandProcessor')
const IterableCollection = require('./IterableCollection')

module.exports = class ClientInstanceCollection extends IterableCollection {
  add (c) {
    const i = this._i++ // get index and increment for next add call
    this[i] = c // assign client socket instance to collection

    console.log(`client ${i} connected`)

    c.on('data', buf => {
      const data = buf.toString()
      const [ , command, ...args ] = data.match(/^(\w+)(.*)/)
      CommandProcessor[command](this, i, args)
    })

    c.on('end', () => {
      console.log(`client ${i} disconnected`)
      this.remove(i) // delete self from collection
    })
  }

  remove (i) {
    delete this[i]
  }
}
