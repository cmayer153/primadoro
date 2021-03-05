const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/primadoro_test3';

const db = mongoose.connect(mongoURI);

module.exports = db;