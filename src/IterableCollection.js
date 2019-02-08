module.exports = class IterableCollection {
  constructor () {
    this._i = 0
  }

  * [Symbol.iterator] () {
    let i = 0
    while (i < this._i) {
      if (this.hasOwnProperty(i)) yield { i, c: this[i++] }
    }
  }
}
