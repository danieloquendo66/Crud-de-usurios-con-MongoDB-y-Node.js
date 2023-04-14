require("dotenv").config();
const Server = require("./app/models/server");

const server = new Server();

server.listen();
