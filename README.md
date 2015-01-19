Message Bank
===

[![Build Status](https://travis-ci.org/krambuhl/message-bank.svg)](https://travis-ci.org/krambuhl/message-bank) 

Subscribable message bank.  


API
===


###MessageBank(options<Object>)

Creates a new message bank instance with predefined options.

####options.setup(callback<Function>)

Alias for `bank.setup(func)`

####options.config(options<Array/Object>)

Alias for `bank.config()`

###Bank().setup(callback<Function>)
###Bank().config(type<String>, config<Object>)
###Bank().dispatch(type<String>, data<Object>, options<Object>)
###Bank().parse(type<String>, data<Object>, options<Object>)
###Bank().subscribe(type<String>, callback<Object>, options<Object>)
###Bank().unsubscribe(id<Integer>)