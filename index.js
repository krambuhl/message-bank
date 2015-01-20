module.exports = MessageBank;

function MessageBank(opts) {
  this.options = opts = (opts || {});

  this._store = {};
  this._config = {};
  this._subscriptions = [];

  if (opts.setup) { this.setup(opts.setup); }
  if (opts.config) { this.config(opts.config); }
}

MessageBank.prototype = require('./lib/prototype.js');