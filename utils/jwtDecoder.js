const JWT = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports = (body) => {
  if (!body) {
    return new Error('invalid jwtdata');
  }

  return jwt_decode(body);

  /**return JWT.verify(body.toString('utf8'), process.env.JWT, {
    algorithm: 'HS256',
  });**/
};
