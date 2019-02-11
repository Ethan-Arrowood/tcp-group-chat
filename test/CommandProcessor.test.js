/* global test describe expect */
const CommandProcessor = require('../src/CommandProcessor')
const IterableCollection = require('../src/IterableCollection')

describe('CommandProcessor', () => {
  test('should be an object', () => {
    expect(typeof CommandProcessor).toBe('object')
  })

  test('should contain properties for all documented commands', () => {
    // TODO - Make commands symbolic strings
    const commands = [
      'chat',
      'connect',
      'disconnect',
      'help',
      'list',
      'login',
      'logout'
    ]

    expect(Object.keys(CommandProcessor)).toStrictEqual(commands)
  })

  test('should assert standard arguments for command method calls', () => {
    // TODO - Use symbolic errors
    expect(() => {
      CommandProcessor.chat({})
    }).toThrow('coll argument must be an instance of IterableCollection')

    expect(() => {
      CommandProcessor.chat(new IterableCollection(), 'not a number')
    }).toThrow('index argument must be a number')

    expect(() => {
      CommandProcessor.chat(new IterableCollection(), 1, 'not an array')
    }).toThrow('args argument must be an Array')

    expect(() => {
      CommandProcessor.chat(new IterableCollection(), 0, [ 'message' ])
    }).not.toThrow()
  })

  test('should not throw on unknown command calls', () => {
    const _log = console.log
    console.log = () => {}
    // TODO - Create a controlled 'unknown' command for testing purposes
    expect(() => {
      CommandProcessor.doesNotExist()
    }).not.toThrow()

    console.log = _log
  })

  test('should noop on unknown command calls', () => {
    // TODO - Unknown command should actually respond to client
    expect(typeof CommandProcessor.doesNotExit).toBe('function')
  })

  test.todo('should write to each client instance except index')

  describe('.chat', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.chat).toBe('function')
    })

    test('should assert first argument of args as a string', () => {
      expect(() => {
        CommandProcessor.chat(new IterableCollection(), 0, [ 12345 ])
      }).toThrow('args[0] must be a string')
    })
  })

  describe('.connect', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.connect).toBe('function')
    })

    test.todo('should assert arguments')
  })

  describe('.disconnect', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.disconnect).toBe('function')
    })

    test.todo('should assert arguments')
  })

  describe('.help', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.help).toBe('function')
    })

    test.todo('should assert arguments')
  })

  describe('.list', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.list).toBe('function')
    })

    test.todo('should assert arguments')
  })

  describe('.login', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.login).toBe('function')
    })

    test.todo('should assert arguments')
  })

  describe('.logout', () => {
    test('should be a function', () => {
      expect(typeof CommandProcessor.logout).toBe('function')
    })

    test.todo('should assert arguments')
  })
})
