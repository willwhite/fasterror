var _ = require('underscore');

module.exports = function(type, defaults) {
    if (typeof defaults === 'string' ||
        typeof defaults === 'number') defaults = { code: defaults };

    function FastError(message, options) {
    if (typeof options === 'string' ||
        typeof options === 'number') options = { code: options };
      Error.call(this);
      Error.captureStackTrace(this, arguments.callee);

      this.name = type;
      this.constructor.name = type;
      this.message = message || '';

      _(this).chain().extend(defaults).extend(options);
    }
    FastError.prototype.__proto__ = Error.prototype;

    return FastError;
};
