import dotenv from "dotenv";
import { io,server } from "./socket.js";
import { ConnectDB } from "./db/index.js";

dotenv.config({ path: "../.env" });                                   

ConnectDB()
  .then((res) => {
    // WebSocket logic
    io.on("connection", (client) => {
      console.log("A client connected");

      client.on("event", (data) => {
        console.log("Event received:", data);
      });

      


      client.on("disconnect", () => {
        console.log("A client disconnected");
      });
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed !!", error);
  });

// Start *one* server
server.listen(process.env.PORT, () => {
  console.log("Server is running on Port ",process.env.PORT);
});
