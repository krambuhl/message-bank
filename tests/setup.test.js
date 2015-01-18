var MsgBank = require('../');
var test = require('tape');

test('#Bank({ setup: func })', function (t) {
  t.plan(2);
  var bank = new MsgBank({
    setup: function(opts) {
      t.equal(typeof opts.setup, 'function');
      t.ok(this instanceof MsgBank);
    }
  });
});

test('#Bank().setup(func)', function (t) {
  t.plan(1);
  var bank = new MsgBank();
  bank.setup(function(opts) {
    t.equal(this, bank);
  });
});
