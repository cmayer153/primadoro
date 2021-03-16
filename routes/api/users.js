const mongoose = require('mongoose');
const passport = require('passport');
const { getLogs } = require('../../database/queries');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route
router.post('/', auth.optional, (req, res, next) => {
  const { body: {user}} = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      }
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then( () => res.json({ user: finalUser.toAuthJSON() }))
    .catch ( (err) => { console.log('error saving new user: ', err)});
});

//POST login route
router.post('/login', auth.optional, (req, res, next) => {
  const { body: {user}} = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      }
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      }
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);

});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const {payload: {id}} = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({user: user.toAuthJSON() , testPayload: 'here is what you asked for breh'});
    });
});

router.get('/logs', auth.required, (req, res, next) => {
  const {payload: {id}} = req;
  console.log('in get logs for id: ', id);

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      console.log('retrieveLogs for: ', user.username);
      getLogs(user.username)
        .then( (data) => {
          // TODO add sort back in, or move to sort by default on retrieve
          console.log('log data before sending: ', data);
          return res.send(data);
        })
        .catch( (err) => {
          return res.status(500).send();
        });
    })
});

router.post('/saveLog', auth.required, (req, res, next) => {
  const {payload: {id}} = req;
  const {body: {entry}} = req;
  console.log('in save this log: ', entry);

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      console.log('saveLog for: ', user.username);
      user.addEntry(entry)
        .then( (data) => {
          // TODO add sort back in, or move to sort by default on retrieve
          console.log('log data before sending: ', data);
          return res.send(data);
        })
        .catch( (err) => {
          return res.status(500).send();
        });
    })
});

router.post('/editLog', auth.required, (req, res, next) => {
  const {payload: {id}} = req;
  const {body: {entry}} = req;
  console.log('in edit this log: ', entry);

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      console.log('saveLog for: ', user.username);
      user.editLog(entry)
        .then( (data) => {
          // TODO add sort back in, or move to sort by default on retrieve
          console.log('log data before sending: ', data);
          return res.send(data);
        })
        .catch( (err) => {
          return res.status(500).send();
        });
    })
});

module.exports = router;