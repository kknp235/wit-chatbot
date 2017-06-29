/*
firstEntityValue method to identify the first entitity value of the entity you need among the entities
trueGreetings is the function which is the part of actions object of the app.js file
Used to give introductory greetings
*/
'use strict';
const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};
exports.trueGreetings=function({context,entities}){
  var contact = firstEntityValue(entities, 'contact')
  if (contact) {
    context.wish = 'Welcome to t.home'
    delete context.missingContact
  } else {
    context.missingContact = true;
    delete context.wish
    delete context.contact
  }
  return context;
}
