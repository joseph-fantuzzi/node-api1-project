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

server.get("/api/users", (req, res) => {
  Model.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Model.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Model.remove(id)
    .then((removedUser) => {
      if (!removedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(removedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
