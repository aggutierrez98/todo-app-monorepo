import express, { json } from "express";
import cors from "cors";
import todoRoutes from "../routes/todos.js";
import usersRoutes from "../routes/users.js";
import testingRoutes from "../routes/testing.js";
import dbConnection from "../database/config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      todos: "/api/todos",
      users: "/api/users",
      testing: "/api/testing",
    };

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Para servir estaticos de react app desde el servidor
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

    //Controlamos que las rutas de testing solo se puedan acceder en cierto entorno
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
