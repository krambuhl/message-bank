module.exports = {
  setup: function(func) {
    func.call(this, this.options);
  },

  config: function(type, config) {
    var typeo = typeof type;
    if (typeo === 'string') {
      this._config[type] = config;
    } else if (Array.isArray(type)) {
      type.forEach(function(t) { 
        this.config(t.type, t); 
      }.bind(this));
    } else if (typeo === 'object') {
      this.config(type.type, type);
    } 
  },

  dispatch: function(type, data, opts) {
    var typeo = typeof type;
    if (typeo === 'string') {
      this._store[type] = this.parse(type, data, opts);
    } else if (Array.isArray(type)) {
      type.forEach(function(t) { 
        this.dispatch(t); 
      }.bind(this));
    } else if (typeo === 'object') {
      this.dispatch(type.type, type.data, type.options);
    } 
  },

  parse: function(type, data, opts) {
    var config = this._config[type];

    if (config && config.transform) {
      data = config.transform(data, opts);
    }

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