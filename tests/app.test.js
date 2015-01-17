var MsgBank = require('../');
var test = require('tape');

test('#Bank()', function (t) {
  var bank = new MsgBank();
  
  t.plan(3);
  t.equal(bank instanceof MsgBank, true, 'msgbox returns an isntance');
  t.equal(typeof bank, 'object', '');
  t.equal(typeof bank.options, 'object');
});

test('#Bank({ setup: func })', function (t) {
  t.plan(2);
  var bank = new MsgBank({
    setup: function(opts) {
      t.equal(typeof opts.setup, 'function');
      t.equal(this, bank);
    }
  });
});

test('#Bank().setup()', function (t) {
  t.plan(1);
  var bank = new MsgBank();
  bank.setup(function(opts) {
    t.equal(this, bank);
  });
});


