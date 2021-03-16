const mongoose = require('mongoose');
const Users = mongoose.model('Users');


var sortLogs = (entries) => {
  return entries.sort( (a, b) => {
    if (a.timeStamp > b.timeStamp) {
      return -1;
    } else {
      return 1;
    }
  })
}

var getLogs = (username) => {
  const query = Users.where({username: username});
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
exports.sortLogs = sortLogs;