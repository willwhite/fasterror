var util = require('util');

module.exports = fastErrorFactory;

function fastErrorFactory(name, defaults, Parent) {
  function FastError() {
    this.message = util.format.apply(null, arguments);
    this.name = name;
    if (typeof Parent === 'function') {
      Parent.apply(this, arguments);
    }
    Error.captureStackTrace(this, arguments.callee);
  }

  if (typeof defaults === 'function') {
    Parent = defaults;
    defaults = undefined;
  }

  FastError.prototype = Object.create((Parent || Error).prototype, {
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
