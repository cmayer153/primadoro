const PrimaLogs = require('./PrimaLogs.js');

var getLogs = (username) => {
  const query = PrimaLogs.where({username: username});
  return query.find();
};

var saveLog = (entry) => {
  return PrimaLogs.create(entry);
}

exports.getLogs = getLogs;
exports.saveLog = saveLog;
