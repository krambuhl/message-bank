var MsgBank = require('../');
var test = require('tape');

test('bank.config(type, opt.transform)', function (t) {
  var bank = new MsgBank();
  bank.config('TEST', { transform: transform });

  function transform(d, o) {
    d.alt = d.first + o.addition;
    return d;
  }

  bank.dispatch('TEST', { first: 100 }, { addition: 10 });
  t.plan(1);
  t.equal(bank._store.TEST.data.alt, 110);
});

test('bank.config(config)', function (t) {
  var bank = new MsgBank();
  bank.config({ type: 'TEST', transform: transform });

  function transform(d, o) {
    d.alt = d.first + o.addition;
    return d;
  }

  bank.dispatch('TEST', { first: 100 }, { addition: 10 });
  t.plan(1);
  t.equal(bank._store.TEST.data.alt, 110);
});

test('bank.config([config])', function (t) {
  var bank = new MsgBank();
  bank.config([
    { type: 'TEST', transform: transform },
    { type: 'ALTTEST', transform: transform2 }
  ]);

  function transform(d) { d.alt = d.first + 2; return d; }
  function transform2(d) { d.alt = d.first * 2; return d; }

  bank.dispatch('TEST', { first: 100 });
  bank.dispatch('ALTTEST', { first: 50 });

  t.plan(2);
  t.equal(bank._store.TEST.data.alt, 102);
  t.equal(bank._store.ALTTEST.data.alt, 100);
});