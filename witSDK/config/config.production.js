var config = require('./config.global');

config.env = 'production';

//Application
config.app.hostname = 'http://10.11.14.94'
config.app.port = '8082';

//Redis database
config.redis.hostname = 'localhost';
config.redis.port = '6379';
config.mongodb.hostname = 'mongodb://localhost';
config.mongodb.port = '27017';
module.exports = config;
