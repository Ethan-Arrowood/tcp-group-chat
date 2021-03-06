/**
 * Collection class prototype that implements a symbolic iterator usable in the CommandProcessor class
 */
class IterableCollection {
  /**
   * Creates an empty collection with a starting internal index `_i` of 0
   */
  constructor () {
    this._i = 0
  }

  /**
   * Returns the number of instances in the collection
   * @return {number} length
   */
  length () {
    let l = 0
    for (let i = 0; i < this._i; i++) {
      if (this.hasOwnProperty(i)) l++
    }
    return l
  }

  /**
   * Returns the current `_i` value and then increments it
   * @return {number} index
   */
  getIndex () {
    return this._i++
  }

  /**
   * Adds item to the collection. Uses the {@link getIndex}
   * method to control the key descriptor. Returns the index
   * of the added item.
   * @param {any} item
   * @return {number} index
   */
  add (item) {
    const i = this.getIndex()
    this[i] = item
    return i
  }

  /**
   * This symbolic iterator is what makes this collection unique.
   * It is a generator function that yields an object containing
   * the index key descriptor and the item
   * @method [Symbol.iterator]
   * @memberof! IterableCollection#
   * @yields {IterableCollectionItem}
   */
  * [Symbol.iterator] () {
    let i = 0
    while (i < this._i) {
      if (this.hasOwnProperty(i)) yield { i, c: this[i++] }
    }
  }

  /**
   * @typedef {Object} IterableCollectionItem
   * @property {number} i The index key descriptor of the item
   * @property {any} c The item within the collection at the given index
   */
}

module.exports = IterableCollection
