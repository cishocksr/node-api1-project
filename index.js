const db = require("./data/db");
const express = require("express");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessge: "The users information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const usersInfo = req.body;

  if (usersInfo.name && usersInfo.bio) {
    db.insert(usersInfo)
      .then(user => {
        res.status(201).json({ success: true, user });
      })
      .catch(err => {
        res.status(500).json({ success: false, err });
      });
  } else {
    res.status(400).json({
      message: "Please provide a name and bio for the user"
    });
  }
});
