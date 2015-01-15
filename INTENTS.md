

```js

// config.js
module.exports = {
  ROUTE: 'ROUTE'
}

// bank.js
var bank = new MessageBank();
var identifiers = require('./config.js');

bank.types(identifiers).config(this.ROUTE, {
  transform: function() {
    data.frags = data.hash.split('/');
    data.action = data.frags[0];
    data.id = data.frags[1];
    return data;
  } 
};

bank.set(bank.ROUTE, { hash: 'blog/how-to-code'});

// component
var Component = requrie('./component.js');
var bank = require('./bank.js');

var el = document.getElementById('application');
var component = new Component();

var routeSub = bank.subscribe(bank.ROUTE, function(data, opts, msg) {
  var action = data.action;
  var id = data.id;

  if (action === 'blog') {
    if (id) { 
      component.loadPost(id);
    } else {
      component.loadIndex();
    }
  } 
});

component.cleanup(function() {
  bank.unsubscribe(routeSub);
})

```