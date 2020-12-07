const redis = require('redis');
const WebSocket = require('ws');
// web socket server
const wss = new WebSocket.Server({ port: 6000 });
// redis subscriber
const subscriber = redis.createClient();

// array to store clients with their ids, whenever they connect
let clients = [];

// subscribe to redis channel
// subscriber.subscribe('newUser');
// subscriber.on('message', (channel, message) => {
//   const dataToBroadcast = JSON.parse(message);
//   const userId = dataToBroadcast.userId;
//   // broadcase to cient with that userId
//   broadcast(dataToBroadcast, userId);
// });

// subscriber.subscribe('newListing');
// subscriber.on('message', (channel, message) => {
//   const dataToBroadcast = JSON.parse(message);
//   const userId = dataToBroadcast.userId;
//   // broadcase to cient with that userId
//   broadcast(dataToBroadcast, userId);
// });

subscriber.subscribe('newInquiry');
subscriber.on('message', (channel, message) => {
  console.log(`Subscriber hears message ${message}`);
  const dataToBroadcast = JSON.parse(message);
  console.log(dataToBroadcast);
  const userId = dataToBroadcast.inquiryID;
  // broadcase to cient with that userId
  broadcast(dataToBroadcast, userId);
});

subscriber.subscribe('newImage');
subscriber.on('message', (channel, message) => {
  const dataToBroadcast = JSON.parse(message);
  const userId = dataToBroadcast.userId;
  // broadcase to cient with that userId
  broadcast(dataToBroadcast, userId);
});

// relay inquiry to clients with that id
const broadcast = (data, inquiryID) => {
  wss.clients.forEach((client) => {
    if (client == clients[inquiryID]) {
      client.send(JSON.stringify(data));
    }
  });
};

// whenever a client connects
wss.on('connection', (ws) => {
  // ws represents a connection
  console.log('Client has connected');

  // ws on message
  ws.on('message', (message) => {
    let clientMessage = JSON.parse(message);
    let clientUserId = clientMessage.userId;
    // storing ws object in the clients array
    clients[clientUserId] = ws;
  });
});
