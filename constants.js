const yargs = require('yargs');
var argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for. Only "-a" for default location.',
      string: true,
    },
    u: {
      demand: false,
      alias: "unit",
      describe: "For Fahrenheit, type 'F'. Leave out to get it in °C.",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

module.exports.argv = argv;
