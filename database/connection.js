const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/primadoro_test2';

const db = mongoose.connect(mongoURI);

module.exports = db;