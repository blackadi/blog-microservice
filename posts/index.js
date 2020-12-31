const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); //generate new ID for each post
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; //act as a database for now to store all posts since this is a demo app

app.get("/posts", (req, res) => {
  res.send(posts); //send back all the post that have been created
});

app.post("/posts", (req, res) => {
  //create a new post

  const id = randomBytes(4).toString("hex"); //generate 4 bytes of random data in hex
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
