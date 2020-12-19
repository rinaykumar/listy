const express = require("express");
const server = require("http");
const httpProxy = require("http-proxy");

const app = express();
const port = 4000;

const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const wsProxy = httpProxy.createProxyServer({
  target: "http://localhost:5001",
  ws: true,
});

// have to do this so entire app doesn't crash
apiProxy.on("error", (err, req, res) => {
  console.log(err);
  res.status(500).send("Proxy error");
});

wsProxy.on("error", (err, req, socket) => {
  console.log(err);
  console.log("ws failed");
  socket.end();
});

// authentication.js
app.all("/auth*", (req, res) => {
  console.log(req.path);
  const options = {
    target: "http://localhost:4001",
  };
  apiProxy.web(req, res, options);
});

// listings.js
// http://localhost:3000/api/imageUpload -> localhost: 4002
app.all("/api*", (req, res) => {
  console.log(req.path);
  const options = {
    target: "http://localhost:4002",
  };
  apiProxy.web(req, res, options);
});

// inquiries.js
// http://localhost:3000/api/inquiries -> localhost: 5000
app.all("/use*", (req, res) => {
  console.log(req.path);
  const options = {
    target: "http://localhost:4003",
  };
  apiProxy.web(req, res, options);
});

const websocketHost = "http://localhost:5001/websocket";
console.log(`WebSocket end proxies to: ${websocketHost}`);
app.all("/websocket*", (req, res) => {
  console.log("incoming ws");
  apiProxy.web(req, res, { target: websocketHost });
});

appServer.on("upgrade", (req, socket, head) => {
  console.log("upgrade ws here");
  wsProxy.ws(req, socket, head);
});

// for frontend
app.all("/*", (req, res) => {
  const options = {
    target: "http://localhost:3000",
  };
  apiProxy.web(req, res, options);
});

appServer.listen(port, () => console.log(`Gateway listening on port ${port}`));
