// BUILD YOUR SERVER HERE

const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("it is working!");
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
