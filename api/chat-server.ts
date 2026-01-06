import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';

import UserMdoel from './models/user';
import MessageModel from './models/message';

const app = express();
app.use(cors({ origin: true, credentials: true }));

const globalForServer = globalThis as unknown as {
  __httpServer?: http.Server;
};

if (!globalForServer.__httpServer) {
  const port = Number(process.env['PORT'] || 3000);

  const server = http.createServer(app);

  globalForServer.__httpServer = server;
} 

const io = new Server(globalForServer.__httpServer, {
  cors: { origin: true, credentials: true },
});

io.on("connection", async (socket) => {
  let userId = socket.handshake.auth['email'];
  console.log("connected:", socket.id);

  let user = await UserMdoel.findOne({ email: userId });

  socket.on("conversation:open", async ({ convId, participant }) => {
    socket.join(convId);

    let other = await UserMdoel.findOne({ email: participant });
    if(user.conversations.find((value: any) => value.id === convId) == null){
      user.conversations.push({
        id: convId,
        participant
      });

      await user.save();
    }
    if(other.conversations.find((value: any) => value.id === convId) == null){
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

export default globalForServer;