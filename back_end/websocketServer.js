const express = require('express');
const axios = require('axios');
const port = 5001;

const app = express();

app.get('/api/websocketServer', (req, res) => {
  // Data we wanna get
  setTimeout(() => {
    res.send('hello world from Websocket Server');
  }, 3000);
});

app.listen(port, console.log(`Websocket server listening on port ${port}`));
