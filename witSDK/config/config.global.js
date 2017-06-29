var config = module.exports = {};

config.env = 'global';

//Application
//config.app = {};
//config.app.hostname = 'http://10.11.14.94'
//config.app.port = '8082';

//Reminder
config.rem = {};
config.rem.hostname = 'http://localhost';
config.rem.port='8081';


//Alarm
config.alarm = {};
config.alarm.hostname = 'http://localhost';
config.alarm.port='8082';

//Calendar
config.calendar = {};
config.calendar.hostname = 'http://localhost';
config.calendar.port='8090';

//socket
config.socket = {};
config.socket.hostname='http://localhost';
config.socket.port='3000';

//Redis database
config.redis = {};
config.redis.hostname = 'localhost';
config.redis.port = '6379';

config.mongodb = {};
config.mongodb.hostname = 'mongodb://localhost';
config.mongodb.port = '27017';
