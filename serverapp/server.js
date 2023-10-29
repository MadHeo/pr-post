var express = require("express"),
  http = require("http");
var app = express(),
  server = http.createServer(app);

app.get("/", function (req, res) {
  res.send("Hello world");
});

server.listen(7777);
