const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 5001 });
let clients = [];
const redis = require("redis");
const subscriber = redis.createClient();
subscriber.subscribe("processImage");
subscriber.on("message", (channel, message) => {
  console.log("Received data :" + message);
  const msg = JSON.parse(message);
  const msgToSend = JSON.stringify(msg);
  wss.clients.forEach((client) => {
    if (client === clients[msg.userID]) {
      client.send(msgToSend);
    }
  });
});
wss.on("connection", (ws) => {
  console.log("Client has connected!");
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData);
    clients[data.userName] = ws;
  });
  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});
