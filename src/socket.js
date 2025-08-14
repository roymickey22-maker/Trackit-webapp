// socket.js
import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app.js"; // Import your Express app

const server = createServer(app); // attach Express to HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

export { server, io };
