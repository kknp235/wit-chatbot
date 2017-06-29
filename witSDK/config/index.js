var env = process.env.NODE_ENV || 'global'
  , cfg = require('./config.'+ env);

module.exports = cfg;
