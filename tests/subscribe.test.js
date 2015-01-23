var MsgBank = require('../');
var test = require('tape');

test('bank.subscribe(type, func)', function (t) {
  var bank = new MsgBank();
  t.plan(3);

  bank.subscribe('TEST', function(d, o, type) {
    t.equal(d.genre, 'metal');
    t.equal(o.duper, true);
    t.equal(type, 'TEST');
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


test('bank.subscribe(func)', function (t) {
  var bank = new MsgBank();
  t.plan(3);

  bank.subscribe(function(d, o, type) {
    t.equal(d.genre, 'metal');
    t.equal(o.duper, true);
    t.equal(type, 'TEST');
  });

  bank.dispatch('TEST', { genre: 'metal' }, { duper: true });
});

test('bank.subscribe(func) -- multiple dispatch types', function (t) {
  var bank = new MsgBank();
  t.plan(9);

  bank.subscribe(function(d, o, type) {
    t.ok(d.genre);
    t.ok(o.duper);
    t.ok(type);
  });

  bank.dispatch('TEST', { genre: 'metal' }, { duper: 'abc' });
  bank.dispatch('ALT', { genre: 'rock' }, { duper: '123' });
  bank.dispatch('BOOP', { genre: 'robot' }, { duper: 'abc123' });
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