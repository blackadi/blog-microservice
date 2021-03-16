//this service is only responsable to check bad words inside each commment
//Type of comment status are {Approved, Pending, or Rejected}

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//event recevied from our broker
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    //determine if the comment is approved or not
    const status = data.content.includes("orange") ? "rejected" : "approved";

    //emit comment moderated status to the event_broker
    // K8s is being used with nginx-ingress srv, pod will handle the request here. CHANGE THIS TO {localhost} otherwise.
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on Port 4003");
});
