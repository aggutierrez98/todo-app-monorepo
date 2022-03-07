import express, { json } from "express";
import cors from "cors";
import todoRoutes from "../routes/todos.js";
import usersRoutes from "../routes/users.js";
import testingRoutes from "../routes/testing.js";
import dbConnection from "../database/config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import expressStaticGzip from "express-static-gzip";
const __dirname = dirname(fileURLToPath(import.meta.url));

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.paths = {
      todos: "/api/todos",
      users: "/api/users",
      testing: "/api/testing",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // To accept brotli gzip files to serve
    this.app.use(
      expressStaticGzip("../app/build", {
        enableBrotli: true, // only if you have brotli files too
      })
    );
    // To serve statics from react app
    this.app.use(express.static("../app/build"));

    this.app.use(cors());
    this.app.use(json());
  }

  routes() {
    this.app.get("/healt", (_, res) => {
      res.send("ok");
    });

    this.app.use(this.paths.todos, todoRoutes);
    this.app.use(this.paths.users, usersRoutes);

    //Testing routes can only be used in testing environment
    if (process.env.NODE_ENV === "test") {
      this.app.use(this.paths.testing, testingRoutes);
    }

    this.app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "../../app/build/index.html"));
    });
  }

  listen() {
    const server = this.app.listen(this.port, () => {
      console.log("Server running in port:", this.port);
    });

    return server;
  }
}

export default Server;
