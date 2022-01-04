const JWT = require('jsonwebtoken');

module.exports = (body) => {
  if (!body) {
    return new Error('invalid jwtdata');
  }

  return JWT.verify(body.toString('utf8'), '-i2T1zUtod5sWGjyxuwKBiYGgpZf7kd-expUK0_cnwLNH4NUT4rw_V_DYWr3YBC73-dVB1mRwEMHe5ePOMwd770nxeFQhlJnAK4Hzh9-mSQrmyqX-_6in9maiDdmMTlcBm4FqlMYeEvnOEf5EbHSpAmPUtgNfGiyWT8toDSG0XsKzuVb-AJjJX06hJrNuc4RBP3BAXBfidY7GcyNC-ZXdSleGsJ52lX_BNkUDA-bUdYjpN927b52gOIWvc0Cyw2', {
    algorithm: 'HS256',
  });
};
