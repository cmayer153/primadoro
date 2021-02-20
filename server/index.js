const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const PORT = 443;
const path = require('path');
import { getLogs, saveLog, editLog, sortLogs } from '../database/queries.js';
const fs = require('fs');

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());

app.get('/api/logs/:username', (req, res) => {
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

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/primadoro.app/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/primadoro.app/fullchain.pem'),
}, app);

httpsServer.listen(PORT, () => {console.log('Primadoro listening on port: ', PORT)});
