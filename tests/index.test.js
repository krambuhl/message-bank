var MsgBank = require('../');
var test = require('tape');

var storekey = '_store';

test('#Bank()', function (t) {
  var bank = new MsgBank();
  
  t.plan(3);
  t.ok(bank instanceof MsgBank);
  t.equal(typeof bank, 'object');
  t.equal(typeof bank.options, 'object');
});

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

test('#Bank().dispatch(type, data)', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch('TEST', { genre: 'metal' });
  t.ok(bank[storekey].TEST);
  t.equal(bank[storekey].TEST.data.genre, 'metal');
  t.deepEqual(bank[storekey].TEST.options, {});
});

test('#Bank().dispatch(type, data, options)', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch('TEST', { genre: 'metal' }, { isTest: true });
  t.ok(bank[storekey].TEST);
  t.equal(bank[storekey].TEST.data.genre, 'metal');
  t.equal(bank[storekey].TEST.options.isTest, true);
});

test('#Bank().dispatch({type, data, options})', function (t) {
  t.plan(3);
  var bank = new MsgBank();
  bank.dispatch({ 
    type: 'TEST', 
    data: { genre: 'metal' }, 
    options: { isTest: true }
  });

  t.ok(bank[storekey].TEST);
  t.equal(bank[storekey].TEST.data.genre, 'metal');
  t.equal(bank[storekey].TEST.options.isTest, true);
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

  t.ok(bank[storekey].TEST);
  t.equal(bank[storekey].TEST.data.genre, 'metal');
  t.equal(bank[storekey].TEST.options.isTest, true);

  t.ok(bank[storekey].TEST);
  t.equal(bank[storekey].TEST.data.genre, 'metal');
  t.equal(bank[storekey].TEST.options.isTest, true);
});



// test('#Bank().subscribe(type, func)', function (t) {});
// test('#Bank().unsubscribe(id)', function (t) {});

// test('#Bank().config(type, opt.transform)', function (t) {
//   var bank = new MsgBank();
//   bank.config('TEST', { 
//     transform: transform
//   });

//   function transform() {

//   }
// });

// test('#Bank().config(config)', function (t) {});
// test('#Bank().config([config])', function (t) {});
