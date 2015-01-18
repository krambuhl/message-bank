var MsgBank = require('../');
var test = require('tape');

test('#Bank().dispatch(type, data)', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch('TEST', { genre: 'metal' });
  t.ok(bank._store.TEST);
  t.equal(bank._store.TEST.data.genre, 'metal');
  t.deepEqual(bank._store.TEST.options, {});
});

test('#Bank().dispatch(type, data, options)', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch('TEST', { genre: 'metal' }, { isTest: true });
  t.ok(bank._store.TEST);
  t.equal(bank._store.TEST.data.genre, 'metal');
  t.equal(bank._store.TEST.options.isTest, true);
});

test('#Bank().dispatch({type, data, options})', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch({ 
    type: 'TEST', 
    data: { genre: 'metal' }, 
    options: { isTest: true }
  });

  t.ok(bank._store.TEST);
  t.equal(bank._store.TEST.data.genre, 'metal');
  t.equal(bank._store.TEST.options.isTest, true);
});

test('#Bank().dispatch([{type, data, options}])', function (t) {
  t.plan(6);
  var bank = new MsgBank();
  bank.dispatch([{ 
    type: 'TEST', 
    data: { genre: 'metal' }, 
    options: { isTest: true }
  }, { 
    type: 'OTHERTEST', 
    data: { genre: 'metal' }, 
    options: { isTest: true }
  }]);

  t.ok(bank._store.TEST);
  t.equal(bank._store.TEST.data.genre, 'metal');
  t.equal(bank._store.TEST.options.isTest, true);

  t.ok(bank._store.TEST);
  t.equal(bank._store.TEST.data.genre, 'metal');
  t.equal(bank._store.TEST.options.isTest, true);
});