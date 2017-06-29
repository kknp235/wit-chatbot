var pizza =require('./methods/pizza_expo');
var alarm = require('./methods/alarmWit');
var child_process = require('child_process');
var cfg = require('./config');
var weather=require('./methods/weather');
var greetings=require('./methods/trueGreetings');
const request = require('request');
var rp = require('request-promise');
var child_process = require('child_process');
// var socket = require('socket.io-client')('http://localhost:3000');
var reminder=require('./methods/setReminder');
var socket = require('socket.io-client')(cfg.socket.hostname+':'+cfg.socket.port);

'use strict';

let Wit = null;
let interactive = null;
try {
  Wit = require('./').Wit;
  interactive = require('./').interactive;
} catch (e) {
console.log('error');
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}
socket.on('connect', function(){
  socket.emit('add user', 'wit.ai bot');
});

socket.on('add user', function (username) {
  if (addedUser) return;
  socket.username = username;
});

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    var data = JSON.stringify(response);
    var dataToSend = JSON.parse(data);
    if (data.quickreplies){
    console.log('identified')
    }
    console.log("Sending..",dataToSend);
    socket.emit('new message', dataToSend.text);
  },

  trueGreetings({context,entities}) {
    console.log(context, entities);
    return greetings.trueGreetings({context,entities});
    console.log(context);
  },
  getForecast({context, entities}) {
    console.log(context, entities);
    return weather.getForecast({context,entities});
      console.log(context);
  },
  pizza_pre({context, entities}) {
      console.log(context, entities);
      return pizza.pizza_pre({context,entities});
        console.log(context);
  },
  pizza({context, entities}) {
    console.log(context, entities);
    return pizza.pizza({context,entities});
      console.log(context);
  },
  reset_context({context,entities}) {
    console.log("--------------End of Story--------------");
      console.log("--------------Context reset--------------");
      return new Promise( function(resolve, reject){
          context = {};
          return resolve(context);
    });
  },
};


const client = new Wit({accessToken, actions});
interactive(client, socket);
