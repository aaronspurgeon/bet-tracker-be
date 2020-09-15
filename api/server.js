const express = require("express");

const configureMiddleware = require("./middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const betsRouter = require("../bets/bets-router");
const recordRouter = require("../record/record-router");

const server = express();

configureMiddleware(server);

server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/bets", betsRouter);
// server.use("/record", recordRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API",
  });
});

server.use((err, req, res, next) => {
  console.log("Error:", err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
