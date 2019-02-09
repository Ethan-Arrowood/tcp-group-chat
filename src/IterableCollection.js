module.exports = class IterableCollection {
  constructor () {
    this._i = 0
  }

  length () {
    let l = 0
    for (let i = 0; i < this._i; i++) {
      if (this.hasOwnProperty(i)) l++
    }
    return l
  }

  getIndex () {
    return this._i++ // return current _i value and increment
  }

  add () {}

  * [Symbol.iterator] () {
    let i = 0
    while (i < this._i) {
      if (this.hasOwnProperty(i)) yield { i, c: this[i++] }
    }
  }
}
