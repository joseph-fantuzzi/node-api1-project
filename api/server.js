// BUILD YOUR SERVER HERE

const express = require("express");

const Model = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("it is working!");
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res.status(400);
    res.json({ message: "Please provide name and bio for the user" });
  } else {
    Model.insert(newUser)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "There was an error while saving the user to the database" });
      });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
