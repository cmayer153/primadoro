const PrimaLogs = require('./PrimaLogs.js');

var getLogs = (username) => {
  const query = PrimaLogs.where({username: username});
  return query.find();
};

var saveLog = (entry) => {
  return PrimaLogs.create(entry);
}

var editLog = (entry) => {
  return PrimaLogs.findOneAndUpdate({_id: entry._id}, {description: entry.description, workRating: entry.workRating})
}

exports.getLogs = getLogs;
exports.saveLog = saveLog;
exports.editLog = editLog;