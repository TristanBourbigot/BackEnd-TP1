import { Server } from 'socket.io';
import { authSocket } from '../auth/index.js';

class Websocket {
    channels = ["general"];
    instance = null;
    io = null;

    constructor(port)
    {
      if (Websocket.instance) {
        return Websocket.instance;
      }
      
      this.io = new Server(port, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
      this.init();
      Websocket.instance = this;
    }

    init(){
      for (let channel of this.channels) {
        this.io.of(channel).on("connection", (socket) => {
            this.messageHandler(socket, channel);

            console.log(`new room opened: ${channel}`);
        });
    }
    }
    
    messageHandler(socket, channel)
    {
        socket.on("message", (msg) =>
        {
            console.log(`Received ${msg}`);

            this.of(channel).emit("message", `${socket.user.dataValues.username} : ${msg}`);
        });
    }

    openChannel()
    {
        this.io.use(authSocket);
        const channel = `channel-${this.channels.length + 1}`;
        this.channels.push(channel);

        this.io.of(channel).on("connection", (socket) => {
            this.messageHandler(socket, channel);

            console.log(`new room opened: ${channel}`);
        });

        return channel;
    }
 
}

export const websocket = new Websocket(3001);

// export function initSocket(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

  
//   io.use(authSocket);

  
//   io.on('connection', (socket) => {
//     console.log('a user connected: ' + socket.user.dataValues.username); 

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', `${socket.user.dataValues.username} : ${msg}`); 
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//   });

//   return io;
// }
