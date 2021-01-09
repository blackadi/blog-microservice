// This service is responsable for providign a compelete list of all posts and coresponding comments
// Here we only need to request from one service which means if the post or comment services whent down this will still have a copy of all the posts and comments and the end user will not be affected
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  //If the service went down then fetch all the event from the broker to sync with other services
  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("Proccessing event:", event.type);

    handleEvent(event.type, event.data);
  }
});
