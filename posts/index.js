const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); //generate new ID for each post
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; //act as a database for now to store all posts since this is a demo app

//Qeury service is handling this NOW
// app.get("/posts", (req, res) => {
//   res.send(posts); //send back all the post that have been created
// });

//Im using ks8 here, CHANGE THIS TO /posts to run with localhost instead
app.post("/posts/create", async (req, res) => {
  //create a new post

  const id = randomBytes(4).toString("hex"); //generate 4 bytes of random data in hex
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  //register an event with our broker
  //Here im using ks8 pod address direct the trafic you can change to localhost if you don't want ks8
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("apply ks8!");
  console.log("Listening on 4000");
});
