import dotenv from "dotenv";
import Server from "./models/Server.js";
dotenv.config();

const server = new Server();
const serverListening = server.listen();

export default {
  app: server.app,
  serverListening,
};
