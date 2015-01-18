module.exports = Bank;

function Bank(opts) {
  this.options = opts = (opts || {});
  this._store = {};
  this._config = {};

  if (opts.setup) { this.setup(opts.setup); }
}

Bank.prototype = require('./lib/prototype.js');