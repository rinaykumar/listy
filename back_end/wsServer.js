const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 5001 });
let clients = [];
const redis = require("redis");
const subscriber = redis.createClient();

subscriber.subscribe("processImage");
subscriber.subscribe("postInquirytoAdmin");
subscriber.on("message", (channel, message) => {
  console.log("Received data :" + message);
  const msg = JSON.parse(message);
  const msgToSend = JSON.stringify(msg);

  if (channel === "processImage") {
    console.log("INSIDE PROCESS IMAGE");
    wss.clients.forEach((client) => {
      if (client === clients[msg.userID]) {
        client.send(msgToSend);
      }
    });
  }

  if (channel === "postInquirytoAdmin") {
    console.log("INSIDE POST INQUIRY TO ADMIN");
    clients["admin"].send(msgToSend);
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
