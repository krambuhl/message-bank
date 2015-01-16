module.exports = Bank;

function Bank(opts) {
  this.options = opts;

  if (opts.types) { this.types(opts.types); }
  if (opts.setup) { this.setup(opts.setup); }
}

Bank.prototype = require('./lib/prototype.js');