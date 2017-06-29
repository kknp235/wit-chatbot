/*
firstEntityValue method to identify the first entitity value of the entity you need among the entities
pizza and pizza_pre are the functions which are the part of actions object of the app.js file
pizza_pre and pizza functions are used to update information if deficient, given by the user and take them from the user
*/

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
const secondEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 1 &&
    entities[entity][1].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};
const thirdEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 2 &&
    entities[entity][2].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

exports.pizza_pre=function ({context, entities}) {

  return new Promise(function (resolve, reject) {
    console.log("context-in: "+JSON.stringify(context));
    if (context.newData) {
      entities = context.newData;
      delete context.newData;
    }

    var topping = firstEntityValue(entities, 'pizza_topping');
    if(secondEntityValue(entities,'pizza_topping'))
      topping=topping+' , '+secondEntityValue(entities,'pizza_topping');
    if(thirdEntityValue(entities,'pizza_topping'))
      topping=topping+' , '+thirdEntityValue(entities,'pizza_topping');
    var psize = firstEntityValue(entities, 'pizza_size');

    if ( topping )
    { context.topping_str = topping.toUpperCase(); }

    if ( context.topping_str )
    { delete context.missingTopping; }
    else
    { context.missingTopping = true; }

    if ( psize )
    { context.size_str = psize.toUpperCase(); }

    if ( context.size_str )
    { delete context.missingSize; }
    else
    { context.missingSize = true; }
    console.log("context-out: "+JSON.stringify(context));
    return resolve(context);})

}

exports.pizza=function ({context, entities}) {

  return new Promise(function (resolve, reject) {
    console.log("context-in: "+JSON.stringify(context));
    var topping = firstEntityValue(entities, 'pizza_topping');

    var psize = firstEntityValue(entities, 'pizza_size');

    var yes_no = firstEntityValue(entities, 'yes_no');

    if (topping || psize) {
      context.newData = entities;
    }
    else {
      if (context.topping_str
        && context.size_str
        && (yes_no === 'Yes'))
      { context.pizza_success = 'Ok, it is on the way :)'; }
      else
      { context.pizza_success = 'Sorry, forget it.'; }

      delete context.topping_str;
      delete context.size_str;
      delete context.missingSize;
      delete context.missingTopping;
    }
    console.log("context-out: "+JSON.stringify(context));
    return resolve(context);})
}
