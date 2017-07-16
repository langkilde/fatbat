const express = require("express");
const logger = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');
const server = express();
const cors = require('cors');
const axios = require('axios');

server.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': 'http://localhost:8787',
  'methods': 'GET',
  'preflightContinue': false
}));

server.options('*', cors());

server.use(logger('combined'));

server.get('/api', function (req, res) {
  
  const instance = axios.create({
    baseURL: "https://api.fitbit.com/",
    timeout: 5000,
    headers: {"Authorization": "Bearer " + req.query.token}
  });
  
  console.log("received call to fitbit api", req.query);
  instance.get(req.query.query)
    .then((response) => {
      console.log("request to fitbit api succeeded");
      if (response.data) {
        console.log("reponse.data :", response.data);
        res.status(200).send(response.data);
      } else {
        res.status(404).send("no data");
      }
    })
    .catch((error) => {
      console.log("request to fitbit api failed : ", error);
      res.status(500).send("request to fitbit api failed : " + error);
    });
});

const PORT = 4000;
server.listen(PORT, () => console.log('listening to port', PORT));
