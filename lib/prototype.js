module.exports = {
  setup: function(func) {
    func.call(this, this.options);
  },

  config: function(type, opts) {},
  set: function(type, data, opts) {},
  subscribe: function(type, callback) {},
  unsubscribe: function(id) {}
};