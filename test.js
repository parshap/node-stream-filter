var filter = require("./"),
	test = require("tape");

test("filter", function(t) {
	var stream = filter(function(data) {
		return data.length > 1;
	});
	t.plan(2);
	stream.on("data", t.ok.bind(t));
	stream.on("error", t.ifError.bind(t));
	stream.write("test");
	stream.write("t");
	stream.write("hello");
	stream.end("a");
	t.end();
});

test("filter.obj", function(t) {
	var stream = filter.obj(function(data) {
		return data.foo > 0;
	});
	t.plan(2);
	stream.on("data", t.ok.bind(t));
	stream.on("error", t.ifError.bind(t));
	stream.write({foo: 2});
	stream.write({foo: 0});
	stream.end({foo: 1, bar: 'baz'});
	t.end();
});

test("filter.async", function(t) {
	var stream = filter.async(function(data, callback) {
		process.nextTick(function() {
			callback(null, data.length > 1);
		});
	});
	t.plan(2);
	stream.on("data", t.ok.bind(t));
	stream.on("error", t.ifError.bind(t));
	stream.write("test");
	stream.write("t");
	stream.write("hello");
	stream.end("a");
});


test("filter.async.obj", function(t) {
	var stream = filter.async.obj(function(data, cb) {
		process.nextTick(function() {
			cb(null, data.foo > 0);
		});
	});
	t.plan(2);
	stream.on("data", t.ok.bind(t));
	stream.on("error", t.ifError.bind(t));
	stream.write({foo: 2});
	stream.write({foo: 0});
	stream.end({foo: 1, bar: 'baz'});
});
