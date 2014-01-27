fasterror
=========
Quickly create custom error objects.

```
var fasterror = require('fasterror');
var MyError = fasterror('MyError', {code: 'ENOENT'});
```

`fasterror()` is the factory for creating custom error objects. The first
argument is the name of the desired custom error object. The second is an object
containing keys that will decoate any errors created with the resulting object.

```
var err = new MyError('Failed to load user', {reason: 'missing', code: 2});
```

Create new errors with the resulting object. The first argument is the error
message. The second is an object containing keys that will decorate the error,
overriding any keys set by the factory.
