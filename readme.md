# TCP Group Chat

A group chat client-server application built on raw TCP sockets.

## How to use
1. Run tcp server `node server.js`
2. Connect via `telnet` or `nc`
```bash
telnet localhost 8124
```
3. Send messages in chat by writing `chat <message>` from the client connections

## First thoughts
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

## Documentation

### CommandProcessor.js

### IterableCollection.js

### ClientInstanceCollection.js

### DefaultChatServer.js