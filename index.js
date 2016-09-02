/* jshint node:true */
"use strict";

var through = require("through2");

// # Filter
// Create a through stream that only passes data that passes the given test
// function
var filter = module.exports = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		if (test(data)) cb(null, data);
		else cb(null);
	});
};

module.exports.obj = function(test, opt) {
	opt = opt || {}
	opt.objectMode = true
	return filter(test, opt)
};

// # Async Filter
// Create a through stream that only passes data that passes the given async
// test function
var async = module.exports.async = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		test(data, function(err, passed) {
			if (err) cb(err);
			else if (passed) cb(null, data);
			else cb(null);
		});
	});
};

module.exports.async.obj = function(test, opt) {
	opt = opt || {}
	opt.objectMode = true
	return async(test, opt)
};
