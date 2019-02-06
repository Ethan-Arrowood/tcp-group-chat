# TCP Group Chat

A group chat client-server application built on raw TCP sockets.

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