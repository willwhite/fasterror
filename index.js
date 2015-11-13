var util = require('util');

module.exports = fastErrorFactory;

function fastErrorFactory(name, defaults) {
  function FastError() {
    this.message = util.format.apply(null, arguments);
    this.name = name;
    Error.captureStackTrace(this, arguments.callee);
  }

  FastError.prototype = Object.create(Error.prototype, {
    constructor: { value: FastError }
  });

  if (typeof defaults === 'string' || typeof defaults === 'number') {
    FastError.prototype.code = defaults
  } else if (typeof defaults === 'object') {
    for (var key in defaults) {
      FastError.prototype[key] = defaults[key];
    }
  }

  return FastError;
}
