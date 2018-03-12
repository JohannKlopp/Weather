const axios = require("axios");

const temp_conversion = require("./temp_conversion.js");
const constants = require("./constants.js");

var userAddressInput = constants.argv.a;

function masterFunction(userAddressInput) {
  if (userAddressInput.length > 0) {
    var encodedAddress = encodeURIComponent(userAddressInput);
  } else {
    var encodedAddress = encodeURIComponent("Porto");
  }
  var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDAlsLKdWdsXAtVQX4W0uGYr06f2xEY3ec`;
  axios.get(geocodeURL/* get returns a promise */).then((response /*whatever we get back from gmaps*/) => {
    if(response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address. Make sure it exists.");
    }
    if (encodedAddress === "Porto") {
      console.log(`Weather for the default location of ${response.data.results[0].formatted_address}.`);
    } else {
      console.log(`Weather for ${response.data.results[0].formatted_address}.`);
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/872f8e580f7be718de027ac1548178f4/${lat},${lng}`;
    return axios.get(weatherURL); /*returning a new promise, makes it possible to use .then below*/
  }).then((response /*whatever we get back from darksky*/) => {

    /*Temperatures*/
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    temp_conversion.convertTemp(temperature, apparentTemperature);

    /*Precipitation*/
    var precipType = response.data.currently;
    function functionprecipType(){
      if (precipType.hasOwnProperty("precipType")) {
        var precipType1 = response.data.currently.precipType;
        console.log(`There is a ${precipProb}% chance of ${precipType1} throughout the day.`);
      } else {
        var precipType1 = "any precipitation";
        console.log(`There is a ${precipProb}% chance of ${precipType1} throughout the day.`);
      };
    }
    var precipProb = Math.round(response.data.currently.precipProbability * 100);

    functionprecipType();

    /*Error handling*/
  }).catch((e) => {
    if (e.code === "ENOTFOUND" && e.hostname === 'mapsgoogleapis.com') {
      console.log("Unable to connect to google maps API servers.");
    } else if (e.code === "ENOTFOUND" && e.hostname === 'apidarksky.net') {
      console.log("Unable to connect to darksky API servers.");
    } else {
      console.log(e.message);
    }
  });
};

masterFunction(userAddressInput);
