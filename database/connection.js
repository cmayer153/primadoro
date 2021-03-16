const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/primadoro_auth_test_1';

mongoose.connect(mongoURI)
  .then( () => {
    console.log('ya boi got that mongo hookup');
  })
  .catch( (err) => {
    console.log('mongo connection failed: ', err);
  })

//const db = mongoose.connect(mongoURI);
//module.exports = db;