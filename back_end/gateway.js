const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 3000;

const apiProxy = httpProxy.createProxyServer();

// have to do this so entire app doesn't crash
apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy error');
});

// forwarding logic
// all forwards every type (get, post, delete etc)
// http://localhost:3000/api/authentication -> localhost: 4000
app.all('/api/authentication*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:4000',
  };
  apiProxy.web(req, res, options);
});

// http://localhost:3000/api/imageUpload -> localhost: 4001
app.all('/api/imageUpload*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:4001',
  };
  apiProxy.web(req, res, options);
});

// http://localhost:3000/api/inquiries -> localhost: 5000
app.all('/api/inquiries*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:5000',
  };
  apiProxy.web(req, res, options);
});

// http://localhost:3000/api/websocketServer -> localhost: 5001
app.all('/api/websocketServer*', (req, res) => {
  console.log(req.path);
  const options = {
    target: 'http://localhost:5001',
  };
  apiProxy.web(req, res, options);
});

app.listen(port, () => console.log(`Proxy listening on port ${port}`));
