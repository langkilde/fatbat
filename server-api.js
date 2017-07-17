const express = require("express");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const server = express();
const cors = require('cors');
const axios = require('axios');

server.use(cors({
  'origin': 'http://localhost:8787',
  'methods': 'GET',
}));

server.options('*', cors());

server.use(logger('combined'));

server.get('/api', function (req, res) {
  
  const instance = axios.create({
    baseURL: "https://api.fitbit.com/",
    timeout: 5000,
    headers: {"Authorization": "Bearer " + req.query.token}
  });
  
  instance.get(req.query.query)
    .then((response) => {
      handleResponse(response, res);
    })
    .catch((error) => {
      handleError(error, req, res);
    });
});

function refreshToken(oldToken) {
  console.log("refreshing token");
  axios.get("http://localhost:3000/refreshToken?token=" + oldToken)
    .then((newToken) => {
      console.log("newToken", newToken);
      return newToken;
  });
}

function handleError(error, req, res) {
  if (error.response.status === 401) {
    if (req.query.refreshToken) {
      const newToken = refreshToken(req.query.token);
    } else {
      res.status(401).send("unauthorized");
    }
  }
}

function handleResponse(response, res) {
  if (response.data) {
    res.status(200).send(response.data);
  } else {
    res.status(404).send("no data");
  }
}

const PORT = 4000;
server.listen(PORT, () => console.log('listening to port', PORT));
