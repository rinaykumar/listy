const express = require('express');
const axios = require('axios');
const port = 4000;

const app = express();

app.get('/api/authentication', (req, res) => {
  // Data we wanna get
  setTimeout(() => {
    res.send('hello world from Authentication');
  }, 3000);
});

app.listen(
  port,
  console.log(`Authentication server listening on port ${port}`)
);
