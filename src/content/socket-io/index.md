---
title: 'Real Time Data Transfer with Socket.io and React'
date: '2021-05-20'
author: 'Ryan Deyo'
author_site: https://rdeyo.com/
---

Building multi-user applications such as a messaging service or game like chess is a challenge. Luckily with JavaScript, we have new technologies sprouting up. Socket.io is one example that allows bi-direction communication between a server and multiple clients.

## Installation and Setup

This article assumes you already have express installed on your local project. With React, we can use npm or yarn to install:

```bash
npm install socket.io socket.io-client
```
```bash
yarn install socket.io socket.io-client
```

Then we need to import socket.io and tie it to our express:

```js
// server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
```

And on client side we establish an endpoint and point our socket instance to it:

```js
// client.js
const ENDPOINT = "http://127.0.0.1:8080";

const io = require("socket.io-client");
const socket = io(ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket']
});
```

## Usage

Now we are ready to start transferring data between server and clients. We use `io.on('connection', (socket) => {` to access our socket logic when the user connects to the client side.

In the following code we have a callable function on the client side that calls `socket.emit`. We pass in two arguments to this function: the name of the socket method/action and then an object of the data we want to send to the server. The server detects that this is called using `socket.on` with the same method/action name and then a callback function which performs actions with the data that is passed from the client.

In this case, we are manipulating data and then passing it back from the server to the a different client. When `io.emit` runs, it transfers data to all connected clients. The other method to use is `socket.broadcast.emit` to transfer data to all clients except the  client sending the data.

```js
// server.js
socket.on('joinRoom', data => {
  if (rooms[data.roomId].waitingRoom.length < 2) {
      rooms[data.roomId].waitingRoom.push({
          player: data.player,
          color: null,
      });
  } else {
      rooms[data.roomId].spectators.push(data.player.id);
  }
  io.emit('toGameRoom', {
      rooms: rooms,
      roomId: data.roomId
  });
});

// client.js
joinRoom = (roomId) => {
    socket.emit('joinRoom', {
      roomId: roomId,
      player: this.state.player,
    });
  }
```

This is a basic use case for Socket.io. In further reading there are more advanced options available such as broadcasting to rooms or using namespaces to only use a single pipe between server and client.

## Further Reading

- [Socket.io Cheatsheet](https://socket.io/docs/v3/emit-cheatsheet/index.html)
- [Socket.io Namespaces](https://socket.io/docs/v3/namespaces/index.html)