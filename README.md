# stream-filter

Filter data using a [through stream](https://github.com/rvagg/through2).

[![build status](https://img.shields.io/travis/parshap/node-stream-filter.svg)](https://travis-ci.org/parshap/node-stream-filter)

## Installation

[npm: *stream-filter*](https://www.npmjs.com/package/stream-filter)

```
npm install stream-filter
```

## Example

```js
var filter = require("stream-filter");

process.stdin.pipe(filter(function(data) {
	return data.length > 2;
})).pipe(process.stdout);
```

### Async Filter Function

```js
var filter = require("stream-filter");

process.stdin.pipe(filter.async(function(data, callback) {
	doAsyncThing(data, function(err, size) {
		callback(err, size > 2);
	});
})).pipe(process.stdout);
```

## API

```js
var filter = require("stream-filter");
filter(fn, options);
filter.obj(fn, options);
filter.async(fn, options);
filter.async.obj(fn, options);
```

Note that `filter.obj(fn)` and `filter.async.obj(fn)` are convenience
wrappers to pass `{ objectMode: true }`.

See [index.js](./index.js) and [test.js](./test.js) for API details.
