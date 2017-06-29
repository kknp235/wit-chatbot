'use strict';

const {DEFAULT_MAX_STEPS} = require('./config');
const logger = require('./log.js');
const readline = require('readline');
const uuid = require('uuid');

module.exports = (wit, socket, initContext, maxSteps) => {
  let context = typeof initContext === 'object' ? initContext : {};
  const sessionId = uuid.v1();

  const steps = maxSteps ? maxSteps : DEFAULT_MAX_STEPS;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.setPrompt('> ');
  const prompt = () => {
    rl.prompt();
    rl.write(null, {ctrl: true, name: 'e'});
  };
  prompt();
  // rl.on('line', (line) => {
  //   line = line.trim();
  //   if (!line) {
  //     return prompt();
  //   }
socket.on('new message', function(data){
  var line = data.message
    wit.runActions(sessionId, line, context, steps)
    .then((ctx) => {
      context = ctx;
      //prompt();
    })
    .catch(err => console.error(err))
  });
};
