const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require("./weather/weather.js");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Temperature in ${results.address}:`);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
          function celsius(actual, feel) {
            var temp1 = actual;
            var temp2 = feel;
            var roundedTemp1 = Math.round((temp1 - 32) * 5/9);
            var roundedTemp2 = Math.round((temp2 - 32) * 5/9);
            console.log(`It's currently ${roundedTemp1}°C but it feels like ${roundedTemp2}°C.`);
          };
          celsius(weatherResults.temperature, weatherResults.apparentTemperature);
        };
    });
  }
});
