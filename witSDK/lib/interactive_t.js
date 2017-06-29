'use strict';

const {DEFAULT_MAX_STEPS} = require('./config');
const logger = require('./log.js');
const readline = require('readline');
const uuid = require('uuid');

module.exports = (wit, socket, initContext, maxSteps) => {
  socket.on('new message', function(data){
    console.log("Got query from user " + data.username + "--" + data.message);
    let context = typeof initContext === 'object' ? initContext : {};
    const sessionId = uuid.v1();
    const steps = maxSteps ? maxSteps : DEFAULT_MAX_STEPS;
    var line = data.message
    wit.runActions(sessionId, line, context, steps)
    .then((ctx) => {
      context = ctx;
    })
    .catch(err => console.error(err))
    //}
    });
};
