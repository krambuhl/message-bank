var MsgBank = require('../');
var test = require('tape');

test('bank.subscribe(type, func)', function (t) {
  var bank = new MsgBank();
  t.plan(2);

  bank.subscribe('TEST', function(d, o) {
    t.equal(d.genre, 'metal');
    t.equal(o.duper, true);
  });

  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
});

test('bank.subscribe(type, func)', function (t) {
  var bank = new MsgBank();
  t.plan(4);

  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
  bank.subscribe('TEST', function(d, o) {
    t.equal(d.genre, 'metal');
    t.equal(o.duper, true);
  });
  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
});

test('bank.subscribe(type, func, { immediate })', function (t) {
  var bank = new MsgBank();
  t.plan(1);

  bank.dispatch('TEST', { genre: 'metal' });
  bank.subscribe('TEST', function(d, o) {
    t.equal(d.genre, 'picklerock');
  }, { immediate: false });

  bank.dispatch('TEST', { genre: 'picklerock' });
});

test('id = bank.subscribe(type, func)', function (t) {
  var bank = new MsgBank();
  t.plan(1);

  var id = bank.subscribe('TEST', function(d, o) { });
  t.ok(!isNaN(parseFloat(id)) && isFinite(id));

  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
});

test('bank.unsubscribe(id)', function (t) {
  var bank = new MsgBank();
  t.plan(2);

  var id = bank.subscribe('TEST', function(d, o) { 
    bank.unsubscribe(id);
    t.equal(d.genre, 'metal');
    t.equal(o.duper, true);
  });

  // 2nd dispatch should be effectivly skipped
  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
});