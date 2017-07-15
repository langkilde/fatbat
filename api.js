const express = require("express");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const server = express();

server.use(logger('combined'));

server.get('/api', function (req, res) {
  console.log("received call to fitbit api");
  console.log("userId:", req.query.userId);
  console.log("token:", req.query.token);
  console.log("query:", req.query.query)
});

const PORT = 4000;
server.listen(PORT, () => console.log('listening to port', PORT));
