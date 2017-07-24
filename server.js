const express = require("express");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const server = express();

server.use(logger('combined'));

if (process.env.NODE_ENV !== 'production') {
  console.log('starting dev server');
  const webpackDevMiddleware = require("webpackdevmiddleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  server.use(webpackDevMiddleware(webpack(webpackConfig)));
  server.use(webpackDevMiddleware(webpack(webpackConfig)));
} else {
  console.log('starting production server');
  server.use(express.static('build'));
  server.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build/index.html'));
    });
}

const PORT = 3000;
server.listen(PORT, () => console.log('listening to port', PORT));