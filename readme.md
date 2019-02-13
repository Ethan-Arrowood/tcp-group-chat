# TCP Group Chat

A group chat client-server application built on raw TCP sockets.

## How to use
1. Run tcp server `node index.js`
2. Connect via `telnet` or `nc`
```bash
telnet localhost 8124
```
3. Send messages in chat by writing `chat <message>` or `echo <message>` from the client connections

[GitHub](https://github.com/Ethan-Arrowood/tcp-group-chat)

[Test Coverage](./coverage/lcov-report/index.html)

[Documentation](https://ethan-arrowood.github.io/tcp-group-chat/)


## First thoughts
> Note these first thoughts have evolvde into some more baked ideas. See Proposal WIP below
Users will launch a client script that allows them to run a couple of predefined commands:
- `connect <server>` used to connect to a tcp chat server
- `login <username>` will login to the connected server
  - _P0_ 
    - username only
    - each server has its own user database saved in a JSON store
  - _P1_
    - username and password
    - each server has its own user database saved in a JSON store
  - _P2_
    - username and password
    - all chat servers share a user database saved in a JSON store
- `list` lists connected users in chat server
- `chat <message>` send message to server
- `disconnect` disconnect from current server (and logout of current user if still logged in)
- `logout` logout of current user but stay connected to server
- `help` list available commands and what they do

## Proposal [WIP]
This section contains some more thoughtout ideas for the application. The core functionality will not suffice for an entire final project but will be prioritized as later features will be build on top of it. 

All features should be implemented in an OOP approach for reproducability as well as modular expansion. Consider functional-like paradigms in order to agnostically test fundamental aspects. See the [`IterableCollection.js`](./src/IterableCollection.js) file and its corresponding test file [`IterableCollection.test.js`](./test/IterableCollection.test.js) for an example.

#### Core functionality:
- User can connect to a chat server
- User can login to an account on the server
- User can send messages that are broadcasted to other users on the server
- Use can logout from their account
  - Should keep user connected to server
- Use can disconnect from the chat server 
  - Auto-logout if still authenticated

#### Future Features (in no particular order or importance):
- Server can have multiple channels
- Users can connect to a server and then select a channel
- Users have a single login for all servers
  - Servers share an authentication database
- User client allows the user to select what server they want to connect to
- There is an admin client for having more control over the server
- Users can list all other users in a channel/server
- Messages are encrypted
- Users login with username _and password_
- Application has an UI
  - Mobile (React Native)
  - Web (React)
  - Desktop (Electron)
- Server's utilize multiprocessing and multithreading to support client connections or channels
- Server logs all traffic
  - messages are not logged; just the 'when/who' sent the message information
- Complete unit and integration testing

## Documentation
This section will be a more generalized documentation that will show how to use the modules as compared to the JSDocs documentation which is more functional.

### CommandProcessor.js

### IterableCollection.js

### ClientInstanceCollection.js

### DefaultChatServer.js