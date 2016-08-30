/* jshint node:true */
"use strict";

var through = require("through2");

// # Filter
// Create a through stream that only passes data that passes the given test
// function
module.exports = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		if (test(data)) cb(null, data);
		else cb(null);
	});
};

// # Async Filter
// Create a through stream that only passes data that passes the given async
// test function
module.exports.async = function(test, opt) {
	return through(opt || {}, function(data, _, cb) {
		test(data, function(err, passed) {
			if (err) cb(err);
			else if (passed) cb(null, data);
			else cb(null);
		});
	});
};
