var MsgBank = require('../');
var test = require('tape');

test('#Bank()', function (t) {
  var bank = new MsgBank();
  
  t.plan(3);
  t.ok(bank instanceof MsgBank);
  t.equal(typeof bank, 'object');
  t.equal(typeof bank.options, 'object');
});
