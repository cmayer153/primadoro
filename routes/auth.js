const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  //console.log('getToken headers: ', req);
  const { headers: { authorization }} = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  })
};

module.exports = auth;