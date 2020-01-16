// implement your API here
const express = require("express");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello from the api");
});
