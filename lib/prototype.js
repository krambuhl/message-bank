function isString(val) { return typeof val === 'string'; }
function isArray(val) { return Array.isArray(val); }
function isObject(val) { return typeof val === 'object'; }

function findSubs(subs, type) {
  return subs.filter(function(sub) {
    return sub.type === type || sub.type === 'ALL';
  });
}

function fireSub(sub, type) {
  var res = this._store[type];
  sub.callback.call(this, res.data, res.options, type);
}

// silly little cache for subscriptions
var uidcache = 0;
function createUID() {
  return uidcache++;
}

module.exports = {
  setup: function(func) {
    func.call(this, this.options);
  },

  config: function(type, config) {
    if (isString(type)) {
      this._config[type] = config;
    } else if (isArray(type)) {
      type.forEach(function(t) { 
        this.config(t.type, t); 
      }, this);
    } else if (isObject(type)) {
      this.config(type.type, type);
    } 

    return this;
  },

  dispatch: function(type, data, opts) {
    if (isString(type)) {
      this._store[type] = this.parse(type, data, opts);
      findSubs(this._subscriptions, type).forEach(function(sub) {
        fireSub.call(this, sub, type);
      }, this);
    } else if (isArray(type)) {
      type.forEach(this.dispatch, this);
    } else if (isObject(type)) {
      this.dispatch(type.type, type.data, type.options);
    } 
    
    return this;
  },

  parse: function(type, data, opts) {
    var config = this._config[type];

    if (config && config.transform) {
      data = config.transform.call(this, data, opts);
    }

    return {
      data: data,
      options: opts || {}
    };
  },
  
  subscribe: function(type, callback, options) {
    var id = createUID();
    var opts = options || {};
    var isImmediate = opts.immediate !== undefined ? opts.immediate : true;

    if (typeof type === 'function') {
      options = callback;
      callback = type;
      type = 'ALL';
    }

    if (type === '*') { type = 'ALL'; }

    var sub = {
      id: id,
      type: type,
      callback: callback,
      options: opts
    };

    this._subscriptions.push(sub);

    if (isImmediate) {
      if (type === 'ALL') {
        for (var t in this._store) {
          fireSub.call(this, sub, t);
        }
      } else if (this._store[type] !== undefined) {
        fireSub.call(this, sub, type);
      }
    }

    return id;
  },
  
  unsubscribe: function(id) {
    this._subscriptions = this._subscriptions.filter(function(sub) {
      return sub.id !== id;
    });
  }
};