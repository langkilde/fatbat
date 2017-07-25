var express = require("express");
var logger = require('morgan');
var path = require('path');
var https = require('https');
var fs = require('fs');
var server = express();
server.use(logger('combined'));
if (process.env.NODE_ENV !== 'production') {
    console.log('starting dev server');
    var webpackDevMiddleware = require("webpackdevmiddleware");
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    server.use(webpackDevMiddleware(webpack(webpackConfig)));
    server.use(webpackDevMiddleware(webpack(webpackConfig)));
}
else {
    console.log('starting production server');
    server.use(express.static('build'));
    server.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });
}
var PORT = 8080;
server.listen(PORT, function () { return console.log('listening to port', PORT); });
