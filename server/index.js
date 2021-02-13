const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3010
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.listen(PORT, () => {console.log('Primadoro listening on port: ', PORT)});