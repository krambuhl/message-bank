module.exports = Bank;

function Bank(opts) {
  this.options = opts = (opts || {});

  this._store = {};
  this._config = {};
  this._subscriptions = [];

  if (opts.setup) { this.setup(opts.setup); }
}

Bank.prototype = require('./lib/prototype.js');