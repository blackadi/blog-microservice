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

  axios.post("http://localhost:4000/events", event); //send a copy to the post service
  axios.post("http://localhost:4001/events", event); //send a copy to the comment service
  axios.post("http://localhost:4002/events", event); //send a copy to the qeury service
  axios.post("http://localhost:4003/events", event); //send a copy to the moderation service

  res.send({ status: "OK" });
});

//provide all the stored events inside the broker
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
