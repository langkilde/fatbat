# Fatbat
Fatbat is a simple Fitbit API webservice

Install using
```npm install```

To use you need to register an app with fitbit dev
https://dev.fitbit.com/

This will give you a client ID and a client secret. Put these in a file named fitbit.json in the config folder.
```
{
  "client_id": "XXXXXX",
  "client_secret": "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
}
```

The callback URL if you run the app on your own computer should be
```
http://localhost:3000/auth/fitbit/callback
```