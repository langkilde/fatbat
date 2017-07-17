const express = require("express");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const config = require('./configs/fitbit.json');
const fitbitAuth = require('fitbit-client-oauth2');
const server = express();
const fitbitClient = new fitbitAuth(config.client_id, config.client_secret);
const redirect_uri = 'http://localhost:3000/auth/fitbit/callback';
const scope = 'activity heartrate profile sleep profile weight';
const authorization_uri = fitbitClient.getAuthorizationUrl(redirect_uri, scope);

server.use(logger('combined'));

server.get('/auth', function (req, res) {
  console.log('sending user to fitbit');
  res.redirect(authorization_uri);
});

server.get('/auth/fitbit/callback', function (req, res) {
  console.log('user returning from fitbit', req.query.code);
  const code = req.query.code;
  fitbitClient.getToken(code, redirect_uri).then(function (token) {
    console.log('token', token);
    const redirectUri = 'http://localhost:8787/?' +
      'access_token=' + token.token.access_token +
      '&user_id=' + token.token.user_id;
    res.redirect(redirectUri);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log('listening to port', PORT));
