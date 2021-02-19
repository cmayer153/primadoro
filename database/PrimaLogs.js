const mongoose = require('mongoose');
const db = require('./connection.js');

const logSchema = new mongoose.Schema({
  username: String,
  timeStamp: String,
  description: String,
  workRating: Number
});

const PrimaLogs = mongoose.model('PrimaLogs', logSchema);

module.exports = PrimaLogs;