/* global test describe expect */
const IterableCollection = require('../src/IterableCollection')

describe('IterableCollection', () => {
  test('should be instantiable', () => {
    expect(() => {
      new IterableCollection() // eslint-disable-line no-new
    }).not.toThrow()
  })

  test('instance should have _i property', () => {
    const ic = new IterableCollection()
    expect(ic.hasOwnProperty('_i')).toBeTruthy()
  })

  test('getIndex() should return _i and increment', () => {
    const ic = new IterableCollection()
    expect(ic._i).toBe(0)
    expect(ic.getIndex()).toBe(0)
    expect(ic._i).toBe(1)
  })

  describe('symbolic iterator', () => {
    test('should return an object with props i and c', () => {
      const ic = new IterableCollection()
      ic.add({})
      const res = [...ic]
      expect(typeof res[0]).toBe('object')
      expect(res[0].hasOwnProperty('i')).toBeTruthy()
      expect(res[0].hasOwnProperty('c')).toBeTruthy()
    })

    test('should return items added in order', () => {
      const ic = new IterableCollection()
      const items = [ 'a', 'b', 'c' ]
      items.forEach(i => ic.add(i))
      const res = [...ic]
      res.forEach((e, i) => {
        expect(e).toStrictEqual({ i, c: items[i] })
      })
    })
  })
})
