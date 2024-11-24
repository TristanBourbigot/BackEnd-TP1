import { Server } from 'socket.io';
import { authSocket } from '../auth/index.js';

class Websocket {
    channels = [];
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
    
    messageHandler(socket, channel)
    {
      console.log(`new connection on ${channel}`);
        socket.on("chat message", (msg) =>
        {
            this.io.of(channel).emit("chat message", msg);
        });
    }

    
    init()
    {
        for (let channel of this.channels) {
            this.io.of(channel).use(authSocket);
            this.io.of(channel).on("connection", (socket) => {
                this.messageHandler(socket, channel);

                console.log(`new channel opened: ${channel}`);
            });
        }
    }

    openChannel(id)
    {
        const channel = `channel-${id}`;
        this.channels.indexOf(channel) === -1 ? this.channels.push(channel) : console.log("This channel already exists");
        this.io.of(channel).use(authSocket);
        this.io.of(channel).on("connection", (socket) => {
            this.messageHandler(socket, channel);

            console.log(`Opened channel: ${channel}`);
        });

        return channel;
    }
 
}

export const websocket = new Websocket(3001);