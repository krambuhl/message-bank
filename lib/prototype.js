module.exports = {
  setup: function(func) {
    func.call(this, this.options);
  },

  config: function(type, opts) {

    
  },

  dispatch: function(type, data, opts) {
    var typeo = typeof type;
    if (typeo === 'string') {
      this._store[type] = this.parse(data, type, opts);
    } else if (Array.isArray(type)) {
      type.forEach(function(t) { this.dispatch(t); }.bind(this));
    } else if (typeo === 'object') {
      this.dispatch(type.type, type.data, type.options);
    } 
  },

  parse: function(data, type, opts) {


    return {
      data: data,
      options: opts || {}
    };
  },
  
  subscribe: function(type, callback) {

  },
  
  unsubscribe: function(id) {

  }
};