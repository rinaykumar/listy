const express = require('express');
const axios = require('axios');
const port = 5000;

const app = express();

// app.get('/api/doSomething', (req, res) => {
//   const userId = req.query.userId;
//   const text = req.query.text;
//   const data1 = {
//     userId: userId,
//     text: text,
//   };
//   // res.json({
//   //   success: true,
//   //   errorCode: 200,
//   // });
//   client.publish('listy', JSON.stringify(data1));
//   res.end();
// });

// app.get('/', (req, res) => {
//   res.json({ message: 'Sorry route did not match.', errorCode: 404 });
// });

app.get('/api/inquiries', (req, res) => {
  // Data we wanna get
  setTimeout(() => {
    res.send('hello world from Inquiries');
  }, 3000);
});

app.listen(port, console.log(`Inquiries server listening on port ${port}`));
