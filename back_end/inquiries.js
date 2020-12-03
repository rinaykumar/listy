const express = require('express');
const axios = require('axios');
const port = 5000;

const app = express();

app.get('/api/inquiries', (req, res) => {
  // Data we wanna get
  setTimeout(() => {
    res.send('hello world from Inquiries');
  }, 3000);
});

app.listen(port, console.log(`Inquiries server listening on port ${port}`));
