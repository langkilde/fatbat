var FitbitClient = require('fitbit-client-oauth2');
var express = require('express');
var https = require('https');
var server = express();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/fatbat';

var insertToken = function(token, db, callback) {
    console.log('attempting insert in db : ', db.s.databaseName);
    var collection = db.collection('users');
    collection.insertOne({  _id             : token.user_id,
                            access_token    : token.access_token,
                            expires_in      : token.expires_in,
                            refresh_token   : token.refresh_token,
                            scope           : token.scope,
                            token_type      : token.token_type,
                            expires_at      : token.expires_at}, function(err, result) {
        if (err != null) {
            console.log(err.message);
            callback('exists');
        } else {
            console.log(result.result);
        }
        callback(result);
    });
};

//var db = MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log('connected correctly to server!');
//    return db;
//});

var client = new FitbitClient('229L8J', 'e9f4b704b543b7a7890e9c8c2d57fedd');
var redirect_uri = 'https://localhost:3000/auth/fitbit/callback';
var scope =  'activity heartrate profile sleep profile weight';

server.get('/', function(req, res) {
   res.write('<html> hello world </html>');
});

server.get('/auth/fitbit', function(req, res, next) {
    console.log('user entered session...');
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);
    console.log('redirecting to : ', authorization_uri);
    console.log('redirect_uri   : ', redirect_uri);
    res.redirect(authorization_uri);
});

server.get('/auth/fitbit/callback', function(req, res, next) {
    var code = req.query.code;
    console.log('retrieved code : ', code);
    console.log('getting token...');
    client.getToken(code, redirect_uri)
        .then(function(token) {
            console.log(token.token);
            console.log('storing in mongo...');

            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log('connected correctly to server!');
                insertToken(token.token, db, function(data) {
                    if (data==null) {
                        console.log('data was empty, duplicate key error probably, so skipping');
                    } else {
                        console.log('inserted token : ', token.token);
                    }
                    db.close();
                });
            });
            console.log('/users?id=' + token.token.user_id +'&access_token='+token.token.access_token);
            res.redirect('/users?id=' + token.token.user_id +'&access_token='+token.token.access_token);
        });
});

server.get('/users', function(req, res) {
    console.log('<------------------------------------------------------------------->');
    var id              = req.query.id;
    console.log(id);
    var access_token    = req.query.access_token;
    console.log(access_token);

    var options = {
        host: 'api.fitbit.com',
        path: '/1/user/-/activities/tracker/steps/date/2015-01-01/2015-12-24.json',
        //path: '/1/user/-/activities/tracker/steps/date/2014-12-24/2015-12-24.json',
        method: 'GET',
        headers: {
            Authorization: 'Bearer '+access_token
        }
    };
    console.log(options);

    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            var data = JSON.parse(str);
            var dailySteps = data['activities-tracker-steps'];
            var numSteps = dailySteps.length;
            console.log(numSteps);
            var totalSteps = 0;
            for (var i = 0; i < numSteps; i++) {
                var stepCount   = dailySteps[i].value;
                var date        = dailySteps[i].dateTime;
                totalSteps += +stepCount;
                console.log(stepCount);
            }
            console.log(totalSteps);
        });
        console.log('done!');
    };
    https.request(options, callback).end();
});

server.listen(3000);