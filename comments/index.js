const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

//create a new comment here related to the recevied postId
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; //fetch the id from the post request then if there is an entry for that id then add it ot the existing array else create new array for that it

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  //emit an event to the event_bus
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

//Incoming events from the broker
app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    // update the comment with the new recevied data from the moderater
    const { id, content, postId, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    }); //return the comment which we need to update from the list

    comment.status = status; //since this is an object we dont need to re-insert it inside the commentsByPostId it will refect

    //emit and comment updated
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
