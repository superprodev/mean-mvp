const socket = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');


const app = express();
app.use(cors({ origin: true, credentials: true }));

const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: { origin: true, credentials: true },
});

io.on("connection", (socket) => {
  let userId = socket.handshake.auth.email;
  console.log("connected:", socket.id);

  socket.on("conversation:open", ({ convId, participant }) => {
    socket.join(convId);


  });

  socket.on("chatMessage", ({content, from }) => {
    const msg = {
      from,
      content,
      date: Date.now(),
    };
    io.to(userId).emit("chatMessage", msg);
  });

  socket.on("disconnect", () => console.log("disconnected:", socket.id));
});

module.exports = server;