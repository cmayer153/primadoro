const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/primadoro_test';

const db = mongoose.connect(mongoURI);

module.exports = db;