'use strict';
const request = require('request');
var rp = require('request-promise');
var child_process = require('child_process');
var socket = require('socket.io-client')('http://localhost:3000');

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../../').Wit;
  interactive = require('../../').interactive;
} catch (e) {
  console.log("error");
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

socket.on('connect', function(){
  socket.emit('add user', 't.home Assistant');
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

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

/* Method reuired for CURL */
function runCmd(cmd)
{
  var resp = child_process.execSync(cmd);
  var result = resp.toString('UTF8');
  return result;
}

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    var data = JSON.stringify(response);
    var dataToSend = JSON.parse(data);
    console.log("Sending..",dataToSend);
    socket.emit('new message', dataToSend.text);
  },
  getForecast({context, entities}) {
    var location = firstEntityValue(entities, 'location');

    /* CURL Operation for Weather API, As the request module works async */
    var curlCmd = 'curl -sS'
    var city = location
    var url = ' "http://api.openweathermap.org/data/2.5/weather?q=' + city + ',IN&appid=bfdfce90725e4923f2dba5568362dee4&units=metric"'
    var cmd = curlCmd + url

    if (location) {
      var replyInc = Math.floor((Math.random() * 2) + 0)
      var result = runCmd(cmd);
      var result = JSON.parse(result);

      /*Weather reply NL */
      var weatherRep = []
      weatherRep[0] = "It look like " + result.weather[0].main + " in "+ location + " & Temperature is " + result.main.temp +"°C"
      weatherRep[1] = "It feels like " + result.weather[0].main + " in "+ location + " & Current Temperature is " + result.main.temp +"°C"
      weatherRep[2] = "Weather condition is " + result.weather[0].main + " in "+ location + " & Temperature is " + result.main.temp +"°C"
      /*------------------*/
      context.forecast = weatherRep[replyInc]
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },
    trueGreetings({context,entities}) {
      var contact = firstEntityValue(entities, 'contact')
      if (contact) {
        context.wish = 'Welcome to t.home'
        //context.contact = contact
        delete context.missingContact
      } else {
        context.missingContact = true;
        delete context.wish
        delete context.contact
      }
      return context;
  }
};



const client = new Wit({accessToken, actions});
interactive(client, socket);
