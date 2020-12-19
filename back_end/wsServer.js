const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 5001 });
let clients = [];
const redis = require("redis");
const subscriber = redis.createClient();

subscriber.subscribe("processImage"); // Redis channel for Image processing status
subscriber.subscribe("postInquirytoAdmin"); // channel for sending inquiry to Admin
subscriber.subscribe("postInquirytoUser"); // channel for sending inquiry to user
subscriber.on("message", (channel, message) => {
  console.log("Received data :" + message);
  const msg = JSON.parse(message);
  const msgToSend = JSON.stringify(msg);

  if (channel === "processImage") {
    console.log(channel);
    wss.clients.forEach((client) => {
      if (client === clients[msg.userID]) {
        client.send(msgToSend);
      }
    });
  }
  if (channel === "postInquirytoAdmin") {
    console.log(channel);
    clients["admin"].send(msgToSend);
  }
  if (channel === "postInquirytoUser") {
    console.log(channel);
    clients[msg.receiver].send(msgToSend);
  }
});

wss.on("connection", (ws) => {
  console.log("Client has connected!");
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData);
    console.log("data " + data.userName);
    clients[data.userName] = ws;
  });
  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});
