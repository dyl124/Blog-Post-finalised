const Handlebars = require('handlebars');

// Register a custom helper
Handlebars.registerHelper('isEqual', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = Handlebars;
