const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDAlsLKdWdsXAtVQX4W0uGYr06f2xEY3ec`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else if (body.status === "OVER_QUERY_LIMIT") {
      console.log("It looks like the g maps API isn't in a good mood right now. Try again until it shows you what you want. :)");
    } else {
        console.log("Uhmm an unforeseen error case occured. Details below:");
        console.log(response);
      };
  });
};

module.exports.geocodeAddress = geocodeAddress;
