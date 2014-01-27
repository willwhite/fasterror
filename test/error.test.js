var assert = require('assert');
var fasterror = require('../index');

describe('error factory', function() {
    it('should make an error constructor', function() {
        var MyError = fasterror('MyError', 'code');
        assert.equal(typeof MyError, 'function');
    });
});

describe('error constructor', function() {
    it('should make a error object that works with instanceof and typeof', function() {
        var MyError = fasterror('MyError', 'code');
        var err = new MyError();
        assert(err instanceof MyError);
        assert(err instanceof Error);
        assert.equal(typeof err, 'object');
    });
    it('should set .name and .message properly', function() {
        var MyError = fasterror('MyError', 'code');
        var err = new MyError('test');
        assert.equal(err.name, 'MyError');
        assert.equal(err.message, 'test');
    });
    it('should set default properties from second argument if it is an object', function() {
        var MyError = fasterror('MyError', {code: 123, foo: 'bar'});
        var err = new MyError();
        assert.equal(err.code, 123);
        assert.equal(err.foo, 'bar');
    });
    it('should set default code if second argument is a string', function() {
        var MyError = fasterror('MyError', 'ENOENT');
        var err = new MyError();
        assert.equal(err.code, 'ENOENT');
    });
    it('should set default code if second argument is a number', function() {
        var MyError = fasterror('MyError', 123);
        var err = new MyError();
        assert.equal(err.code, 123);
    });
});

describe('error object', function() {
    it('should set properties from second argument if it is an object', function() {
        var MyError = fasterror('MyError', {code: 123});
        var err = new MyError();
        assert.equal(err.code, 123);
    });
    it('should set code if second argument is a string', function() {
        var MyError = fasterror('MyError');
        var err = new MyError('test', 'ENOENT');
        assert.equal(err.code, 'ENOENT');
    });
    it('should set code if second argument is a number', function() {
        var MyError = fasterror('MyError');
        var err = new MyError('test', 123);
        assert.equal(err.code, 123);
    });
    it('should merge with defaults from constructor', function() {
        var MyError = fasterror('MyError', {code: 123, foo: 'bar'});
        var err = new MyError('test', 'ENOENT');
        assert.equal(err.code, 'ENOENT');
        assert.equal(err.foo, 'bar');
        var err2 = new MyError('test', {foo: 'baz', bar: 'bin'});
        assert.equal(err2.code, 123);
        assert.equal(err2.foo, 'baz');
        assert.equal(err2.bar, 'bin');
    });
});
