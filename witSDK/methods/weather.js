/*
firstEntityValue method to identify the first entitity value of the entity you need among the entities
getForecast is the function which is the part of actions object of the app.js file
Used to fetch weather of a particular location using weather API
*/

var openweatherkey = <ADD YOUR OPEN WEATHER KEY>
var child_process = require('child_process');
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
function runCmd(cmd){
  var resp = child_process.execSync(cmd);
  var result = resp.toString('UTF8');
  return result;
}

exports.getForecast=function({context, entities}) {
  var location = firstEntityValue(entities, 'location');

  /* CURL Operation for Weather API, As the request module works async */
  var curlCmd = 'curl -sS'
  var city = location
  var url = ' "http://api.openweathermap.org/data/2.5/weather?q=' + city + ',IN&appid='+openweatherkey+'&units=metric"'
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
}
