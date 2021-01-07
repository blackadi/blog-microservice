# blog-microservice

- This is a sample POC on microservice application to explain in a very naive way how microservice  works under the hood.

  * Posts service runs on port 4000
  * Comments service runs on port 4001
  * Query service runs on port 4002
  * Moderation service runs on port 4003

- All those services emits an events into the event bus (BROKER) which is running on port 4005
