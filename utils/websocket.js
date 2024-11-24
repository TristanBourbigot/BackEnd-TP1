import { Server } from 'socket.io';
import { authSocket } from '../auth/index.js';

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  
  io.use(authSocket);

  
  io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.user.dataValues.username); 

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.user.dataValues.username} : ${msg}`); 
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  });

  return io;
}
