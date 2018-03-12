# Weather app :partly_sunny:
Very basic, but kind, node.js weather app accessed from the terminal.

It accepts addresses, city names, regions, even entire countries (though that tends to be inherently inaccurate).
It returns the entered **address** in a nicer-to-look-at format, it gives you the current **temperature** in either Celsius or Fahrenheit and tells you about any **precipitation** on the same day.

## How to
Run `npm install` to install all necessary node modules ([require](https://www.npmjs.com/package/require), 
[yargs](https://www.npmjs.com/package/yargs), [axios](https://www.npmjs.com/package/axios)).

Run `node app.js` or `node app.js --help/-h` to see available options and how to use them.
