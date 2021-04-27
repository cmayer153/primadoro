const express = require('express');
const https = require('https');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.NODE_ENV === 'production' ? 443 : 3010;
const path = require('path');
const fs = require('fs');
//counting on this queries import to start the chain which
//makes the initial connection to Mongo. Is this a flawed method?
//import { getLogs, saveLog, editLog, sortLogs } from '../database/queries.js';

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());
app.use(session({secret: 'primadoro-dev', resave: false, saveUninitialized: false }));

require('../database/connection.js');
require('../database/Users.js');
require('../config/passport.js');
app.use(require('../routes'));

/*
app.get('/api/logs/', (req, res) => {
  console.log('retrieveLogs for: ', req.params.username);
  getLogs(req.params.username)
    .then( (data) => {
      res.send(sortLogs(data));
    })
    .catch( (err) => {
      res.status(500).send();
    });

});

app.post('/api/saveLog', (req, res) => {
  console.log('post request: ', req.body);
  saveLog(req.body.entry)
    .then( () => {
      getLogs(req.body.entry.username)
      .then ( (data) => {
          //console.log('server gotLogs: ', data);
          res.send(sortLogs(data));
      })
    })
    .catch( (error) => {
        console.log('error in server post route:', error );
        res.status(500).send();
    })
});

app.post('/api/editLog', (req, res) => {
  console.log('edit request: ', req.body);
  editLog(req.body.entry)
    .then( () => {
      getLogs(req.body.entry.username)
      .then ( (data) => {
          //console.log('server gotLogs: ', data);
          res.send(sortLogs(data));
      })
    })
    .catch( (error) => {
        console.log('error in server post route:', error );
        res.status(500).send();
    })
});
*/
if (process.env.NODE_ENV === 'production') {
  const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/primadoro.app/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/primadoro.app/fullchain.pem'),
  }, app);
  
  httpsServer.listen(PORT, () => {console.log('Primadoro listening on port: ', PORT)});
} else {
  app.listen(PORT, () => {console.log('Primadoro listening on port: ', PORT)});
}