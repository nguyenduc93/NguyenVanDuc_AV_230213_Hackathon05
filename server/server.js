const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
server.use(cors());

const userRoutes = require("./routes/user.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use("/api/v1/tasks", userRoutes);

server.listen(8001, () => {
  console.log("Server is running on http://localhost:8001");
});
