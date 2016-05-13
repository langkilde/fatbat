var FitbitClient    = require('fitbit-client-oauth2');
var express         = require('express');
var https           = require('https');
var url             = require('url');
var server          = express();
var MongoClient     = require('mongodb').MongoClient;
var assert          = require('assert');
var client          = new FitbitClient('229L8J', 'e9f4b704b543b7a7890e9c8c2d57fedd');
var redirect_uri    = 'http://localhost:3000/auth/fitbit/callback';
var scope           =  'activity heartrate profile sleep profile weight';
var mongo_url       = 'mongodb://localhost:27017/fatbat';

server.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/views/index.html');
});

server.get('/auth/fitbit', function(req, res, next) {
    console.log('AUTH : attempting to authorize user');
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);
    console.log('AUTH : redirecting to : ', authorization_uri);
    console.log('AUTH : redirect_uri   : ', redirect_uri);
    res.redirect(authorization_uri);
});

server.get('/bitcave', function(req, res, next) {
    res.sendFile(__dirname + '/public/views/bitcave.html');
    console.log('BITCAVE : entered bitcave');
    console.log('BITCAVE : user_id      : ',req.query.user_id);
    console.log('BITCAVE : access_token : ',req.query.access_token);
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

server.get('/auth/fitbit/callback', function(req, res, next) {
    console.log('AUTH : fitbit callback recieved');
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

server.get('/users', function(req, res) {
    console.log('<------------------------------------------------------------------->');
    var id              = req.query.id;
    console.log(id);
    var access_token    = req.query.access_token;
    console.log(access_token);

    var options = {
        host: 'api.fitbit.com',
        path: '/1/user/-/activities/tracker/steps/date/2015-01-01/2015-12-24.json',
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