require("dotenv").config();
const express = require("express");

const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //paths
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middlewares();

    //conectar a base de datos
    this.conectarDB();

    //routas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors

    this.app.use(cors());

    //lectura y parseo del body

    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.routes"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor corriendo en el puerto ${this.port}!`)
    );
  }
}

module.exports = Server;
