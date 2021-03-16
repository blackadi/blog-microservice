//This is the event broker which will listen to events from each service and resend a post event to each service with the coresponding data of that event
// each service will listen to the type of event that is related to it's logic and handle it properly

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//create a data structur to store all the events recevied so if a service went down it can reclam the event again ...... this is a POC code not a production ready app
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // K8s is being used with nginx-ingress srv, pod will handle the request here. CHANGE THIS TO {localhost} otherwise.
  axios.post("http://posts-clusterip-srv:4000/events", event); //send a copy to the post service
  axios.post("http://comments-srv:4001/events", event); //send a copy to the comment service
  axios.post("http://query-srv:4002/events", event); //send a copy to the qeury service
  axios.post("http://moderation-srv:4003/events", event); //send a copy to the moderation service

  res.send({ status: "OK" });
});

//provide all the stored events inside the broker
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
