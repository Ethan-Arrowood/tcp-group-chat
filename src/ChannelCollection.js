class ChannelCollection {
  constructor () {
    this.channelList = {}
  }
  add (channel) {
    this.channelList.push(channel)
  }
}

module.exports = ChannelCollection
