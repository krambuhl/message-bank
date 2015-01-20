Message Bank
===

[![Build Status](https://travis-ci.org/krambuhl/message-bank.svg)](https://travis-ci.org/krambuhl/message-bank) 

Subscribable message bank.  

MessageBank behaves subtly different than a standard message bus. **Subscribing to a message type whem a message of that type has been dispatched previously will fire the callback function immediately.**

API
===

###MessageBank(options<Object>)

Creates a new message bank instance with predefined options.

```js
var bank = new MessageBank();
```

####options.setup(callback<Function>)

Alias for `bank.setup(func)`

```js
var bank = new MessageBank({
  setup: function() { }  
});
```

####options.config(options<Array/Object>)

Alias for `bank.config()`

```js
var bank = new MessageBank({
  config: [{
    type: 'SUPER',
    transform: function(data, opts) { }
  }]
});
```

###Bank().setup(callback<Function>)

Calls callback function immediatly with MessageBank instance as function context.  Inert function by default, provides entry point additional setup behavior not default to MessageBox

```js
bank.setup(function() { });
```

###Bank().config(type<String>, config<Object>)

Also: `Bank().config(config<Object>)` `Bank().config([config<Object>])`

Method for configuring how dispatched data is handled for specific dispatch type.  Currently only defines transform config option, but this is a good place to enter custom configuration to be used in a custom parse function.

####config.transform(callback<Function>)

By default transform config is called with data and options as arguments during the parse phase of a dispatch call.

```js
bank.config('SUPER', {
  transform: function(data, opts) {
    data.duper = opts.isNonsense ? false : data.duper;
    return data;
  }
});
```

###Bank().dispatch(type<String>, data<Object>, options<Object>)
Also: `Bank().dispatch(dispatch<Object>)` `Bank().dispatch([dispatch<Object>])`

Dispatches a payload of data to the MessageBank, any subscriptions matching the payload type will be called.

```js
bank.dispatch('SUPER', { duper: true }, { isNonsense: true });
```

###Bank().subscribe(type<String>, callback<Object>, options<Object>)

Subscribe to a specific type of dispatch payload, if previous payload exists callback will be called immediately.  Subscribe returns an id that can used to unsubscribe later.

```js
bank.subscribe('SUPER', function(data, opts) {
  console.log(data, opts);
})
```

#####options.immediate 

By default subscriptions will be called immediately if a payload of that type exists, setting `immediate:false` will hold of on calling until the next dispatch.

```js
bank.subscribe('SUPER', function(data, opts) {
  console.log(data, opts);
}, { immediate: false });
```

###Bank().unsubscribe(id<Integer>)

Unsubscribe from a dispatch type using subscription ID returned when defining a subscription.

```js
var id = bank.subscribe('SUPER', function() {
  // run only once
  bank.unsubscribe(id);
});
```

###Bank().parse(type<String>, data<Object>, options<Object>)

Internal function for manipulating dispatched data expecting a result of `{ data: {}, options: {} }`  By default parse runs any transform configs, but it can be overwriten for custom behavior.