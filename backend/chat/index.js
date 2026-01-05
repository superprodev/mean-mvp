const socket = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');

const UserMdoel = require('../models/user');
const MessageModel = require('../models/message');

const app = express();
app.use(cors({ origin: true, credentials: true }));

const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: { origin: true, credentials: true },
});

io.on("connection", async (socket) => {
  let userId = socket.handshake.auth.email;
  console.log("connected:", socket.id);

  let user = await UserMdoel.findOne({ email: userId });

  socket.on("conversation:open", async ({ convId, participant }) => {
    socket.join(convId);

    let other = await UserMdoel.findOne({ email: participant });
    if(user.conversations.find(value => value.id === convId) == null){
      user.conversations.push({
        id: convId,
        participant
      });

      await user.save();
    }
    if(other.conversations.find(value => value.id === convId) == null){
      other.conversations.push({
        id: convId,
        participant: userId
      })

      await other.save();
    }
  });

  socket.on("message:send", async ({content, to, convId }) => {
    let msg = new MessageModel({
      convId,
      from: userId,
      to,
      content,
      date: Date.now(),
    });
    await msg.save();
    io.to(convId).emit("message:new", { message: msg });
  });

  socket.on("disconnect", () => console.log("disconnected:", socket.id));
});

module.exports = server;