var FitbitClient    = require('fitbit-client-oauth2');
var express         = require('express');
var https           = require('https');
var url             = require('url');
var MongoClient     = require('mongodb').MongoClient;
var assert          = require('assert');
var fs              = require('fs');
var request         = require('sync-request');
var config          = require('./config/fitbit.json');
var client          = new FitbitClient(config.client_id, config.client_secret);
var redirect_uri    = 'http://localhost:3000/auth/fitbit/callback';
var scope           = 'activity heartrate profile sleep profile weight';
var mongo_url       = 'mongodb://localhost:27017/fatbat';
var server          = express();

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

server.use(express.static(__dirname + '/public'));

server.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});


server.get('/auth/fitbit', function(req, res) {
    console.log('AUTH : attempting to authorize user');
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);
    console.log('AUTH : redirecting to : ', authorization_uri);
    console.log('AUTH : redirect_uri   : ', redirect_uri);
    res.redirect(authorization_uri);
});

server.get('/bitcave', function(req, res) {
    res.sendFile(__dirname + '/public/views/bitcave.html');
    console.log('BITCAVE : entered bitcave');
    console.log('BITCAVE : user_id      : ',req.query.user_id);
    console.log('BITCAVE : access_token : ',req.query.access_token);
    
});

server.get('/auth/fitbit/callback', function(req, res) {
    console.log('AUTH : fitbit callback received');
    var code = req.query.code;
    console.log('AUTH : retrieved code : '+code+', getting token...');
    client.getToken(code, redirect_uri).then(function(token) {
        console.log('AUTH : received token : ' + JSON.stringify(token, null, 2));
        MongoClient.connect(mongo_url, function(err, db) {
            insertToken(token.token, db, function(db_insertion_result) {
                db.close();
            });
        });
        console.log('AUTH : authorization completed');
        res.redirect('/bitcave?user_id='+token.token.user_id+'&access_token='+token.token.access_token);
    });
});

var insertToken = function(token, db, callback) {
    console.log('AUTH : attempting to store retrieved token in DB : ', db.s.databaseName);
    var collection = db.collection('users');
    collection.updateOne({  _id                : token.user_id,
                            access_token    : token.access_token,
                            expires_in      : token.expires_in,
                            refresh_token   : token.refresh_token,
                            scope           : token.scope,
                            token_type      : token.token_type,
                            expires_at      : token.expires_at
                        }, {
                            upsert          : true,
                            safe            : false
                        },
        function(err, result) {
        if (err != null) {
            console.log('AUTH : DB : err '+err.message);
        } else {
            console.log('AUTH : DB : ok  '+JSON.stringify(result.result,' ', 2));
        }
        callback(result);
    });
};

function getData(path, req_url) {
    var access_secret   = getParameterByName('access_secret', req_url);
    console.log('DATA : GET : access_secret : '+access_secret);
    var options = {
        headers: {
            Authorization: 'Bearer '+access_secret
        }
    };
    var result = request('GET', 'https://api.fitbit.com'+path, options);
    console.log('DATA : GET : result        : '+ result.getBody());
    return result.getBody();
}

server.get('/data', function(req, res) {
    console.log('DATA : /data : initiated');
    var user_id         = getParameterByName('user_id', req['url']);
    var path = '/1/user/'+user_id+'/activities/steps/date/2015-01-01/2015-01-10.json';
    var body = getData(path, req['url']);
    res.send(body).end();
});

server.get('/user', function(req, res) {
    console.log('DATA : /user : initiated');
    var user_id         = getParameterByName('user_id', req['url']);
    var path = '/1/user/'+user_id+'/profile.json';
    var body = getData(path, req['url']);
    res.send(body).end();
});

server.get('/heartrate', function(req, res) {
    console.log('DATA : /heartrate : initiated');
    var user_id         = getParameterByName('user_id', req['url']);
    var path = '/1/user/'+user_id+'/activities/steps/date/2016-01-01/2016-01-10.json';
    var body = getData(path, req['url']);
    res.send(body).end();
});

server.listen(3000);