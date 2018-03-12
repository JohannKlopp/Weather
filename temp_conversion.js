const constants = require("./constants.js");

function convertTemp(actual, feel) {
  if (actual !== feel) {
    smoothWording = "but wind, humidity and clouds make it feel";
    ending = "";
  } else {
    smoothWording = "and it also feels";
    ending = "Today, wind, humidity and clouds don't change what the measured temperature actually feels like."
  }
  if (constants.argv.u) {
    console.log(`It's currently ${actual} Fahrenheit ${smoothWording} like ${feel} Fahrenheit. ${ending}`);
  } else {
    var roundedCelTemp1 = Math.round((actual - 32) * 5/9);
    var roundedCelTemp2 = Math.round((feel - 32) * 5/9);
    console.log(`It's currently ${roundedCelTemp1}°C ${smoothWording} like ${roundedCelTemp2}°C. ${ending}`);
  }
};

module.exports.convertTemp = convertTemp;
