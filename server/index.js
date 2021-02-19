const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3010
const path = require('path');
import { getLogs, saveLog, editLog } from '../database/queries.js';

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());

app.get('/api/logs/:username', (req, res) => {
  console.log('retrieveLogs for: ', req.params.username);
  getLogs(req.params.username)
    .then( (data) => {
      res.send(data);
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
          res.send(data);
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
          res.send(data);
      })
    })
    .catch( (error) => {
        console.log('error in server post route:', error );
        res.status(500).send();
    })
});

app.listen(PORT, () => {console.log('Primadoro listening on port: ', PORT)});