/* jshint node:true */
"use strict";

var through = require("through2");
var xtend = require("xtend");

var OBJECT_MODE_OPTS = {
  objectMode: true,
  highWaterMark: 16,
};

// # Filter
// Create a through stream that only passes data that passes the given test
// function
var filter = module.exports = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		if (test(data)) cb(null, data);
		else cb();
	});
};

module.exports.obj = function(test, opt) {
	return filter(test, xtend(OBJECT_MODE_OPTS, opt));
};

// # Async Filter
// Create a through stream that only passes data that passes the given async
// test function
var asyncFilter = module.exports.async = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		test(data, function(err, passed) {
			if (err) cb(err);
			else if (passed) cb(null, data);
			else cb();
		});
	});
};

module.exports.async.obj = function(test, opt) {
	return asyncFilter(test, xtend(OBJECT_MODE_OPTS, opt))
};
