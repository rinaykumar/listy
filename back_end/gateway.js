const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 4000;

const apiProxy = httpProxy.createProxyServer();

// const wsProxy = httpProxy.createProxyServer({
//   target: 'http://localhost:6000',
//   ws: true,
// });

// have to do this so entire app doesn't crash
apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy error');
});

// wsProxy.on('error', (err, req, socket) => {
//   console.log(err);
//   console.log('ws failed');
//   socket.end();
// });

// DONT NEED THIS
// forwarding logic
// all forwards every type (get, post, delete etc)
//localhost:3000/api/authentication -> localhost: 4000

// authentication.js
app.all('/auth*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:4001',
  };
  apiProxy.web(req, res, options);
});

// listings.js
// http://localhost:3000/api/imageUpload -> localhost: 4002
app.all('/api*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:4002',
  };
  apiProxy.web(req, res, options);
});

// inquiries.js
// http://localhost:3000/api/inquiries -> localhost: 5000
app.all('/use*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:4003',
  };
  apiProxy.web(req, res, options);
});

// http://localhost:3000/api/websocketServer -> localhost: 5001
// app.all('/api/websocketServer*', (req, res) => {
//   console.log(req.path);
//   const options = {
//     target: 'http://localhost:6000',
//   };
//   apiProxy.web(req, res, options);
// });

// for frontend
app.all('/*', (req, res) => {
  const options = {
    target: 'http://localhost:3000',
  };
  apiProxy.web(req, res, options);
});

app.listen(port, () => console.log(`Proxy listening on port ${port}`));

// // http://localhost:3000/api/imageUpload -> localhost: 4002
// app.all('/api/imageUpload*', (req, res) => {
//   console.log(req.path);
//   const options = {
//     target: 'http://localhost:4002',
//   };
//   apiProxy.web(req, res, options);
// });
