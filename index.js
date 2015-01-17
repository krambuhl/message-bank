module.exports = Bank;

function Bank(opts) {
  this.options = opts = (opts || {});
  if (opts.setup) { this.setup(opts.setup); }
}

Bank.prototype = require('./lib/prototype.js');