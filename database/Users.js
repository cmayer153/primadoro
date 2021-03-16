const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
  logs: Array
});

/*
logs have structure:
  username: String,
  timeStamp: String,
  description: String,
  workRating: Number

*/

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

//TODO is this setting the token to be valid for 60 days?
UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

UserSchema.methods.addEntry = function(entry) {
  console.log("USERSCHEMA adding this entry:", entry);
  this.logs.unshift(entry);
  return this.save();
};


UserSchema.methods.getLogs = function() {

};

const findLogWithTime = function(timeStamp) {
  return this.logs.findIndex((entry) => {
    if(entry.timeStamp === timeStamp) {
      return true;
    }
    else {
      return false;
    }
  });
};

UserSchema.methods.editLog = function(entry) {
  console.log("Editing this etnry:", entry);
  let logIndex = findLogWithTime.call(this, entry.timeStamp);
  if (logIndex >= 0) {
    let tempLog = this.logs[logIndex];
    tempLog = {...tempLog, description: entry.description, workRating: entry.workRating};
    this.logs.set(logIndex, tempLog);
    console.log('about to edit/save: ', tempLog);
  } else {
    console.log('Could not find log to update.');
  }
  return this.save();
};

mongoose.model('Users', UserSchema);