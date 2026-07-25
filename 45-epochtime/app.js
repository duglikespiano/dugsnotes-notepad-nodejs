/**
 * ==========================================================
 * Epoch Time (Unix Timestamp) in JavaScript
 * ==========================================================
 *
 * Definition
 * ----------
 * Epoch time (also called Unix time or Unix timestamp)
 * is the number of seconds or milliseconds that have
 * passed since:
 *
 * January 1, 1970, 00:00:00 UTC
 *
 * JavaScript uses MILLISECONDS.
 *
 * Python usually uses SECONDS.
 *
 * ----------------------------------------------------------
 * Timeline
 * ----------------------------------------------------------
 *
 * 1970-01-01 00:00:00 UTC
 *          │
 *          ├── 1 second       -> 1000 ms
 *          ├── 10 seconds     -> 10000 ms
 *          ├── 1 minute       -> 60000 ms
 *          ├── 1 hour         -> 3600000 ms
 *          └── Today          -> billions of milliseconds
 *
 * ==========================================================
 */

console.log('========== Example 1 ==========');
console.log('Current Epoch Time');

/*
 * Date.now() returns the current epoch time
 * in MILLISECONDS.
 */

const epochMilliseconds = Date.now();

console.log(epochMilliseconds);

/*
 * Convert milliseconds into seconds.
 */

const epochSeconds = Math.floor(epochMilliseconds / 1000);

console.log(epochSeconds);

console.log();

console.log('========== Example 2 ==========');
console.log('Current Date');

/*
 * Create a Date object.
 */

const now = new Date();

console.log(now);

console.log();

/*
 * Convert the Date into epoch time.
 */

console.log('Milliseconds:');
console.log(now.getTime());

console.log();

console.log('========== Example 3 ==========');
console.log('Epoch -> Date');

/*
 * JavaScript expects milliseconds.
 */

const timestamp = 1784980800000;

const date = new Date(timestamp);

console.log(date);

console.log();

console.log('========== Example 4 ==========');
console.log('Python Timestamp -> JavaScript');

/*
 * Imagine a Python backend sends:
 *
 * 1784980800
 *
 * Python timestamps are in SECONDS.
 */

const pythonTimestamp = 1784980800;

/*
 * JavaScript needs milliseconds.
 */

const jsDate = new Date(pythonTimestamp * 1000);

console.log(jsDate);

console.log();

console.log('========== Example 5 ==========');
console.log('JavaScript Timestamp -> Python');

/*
 * JavaScript timestamp:
 */

const jsTimestamp = Date.now();

console.log('JavaScript:');

console.log(jsTimestamp);

/*
 * Convert to Python timestamp.
 */

const pythonTime = Math.floor(jsTimestamp / 1000);

console.log();

console.log('Python:');

console.log(pythonTime);

console.log();

console.log('========== Example 6 ==========');
console.log('Time Difference');

/*
 * Record a start time.
 */

const start = Date.now();

/*
 * Pretend some code runs...
 */

for (let i = 0; i < 1_000_000; i++) {
	Math.sqrt(i);
}

/*
 * Record an end time.
 */

const end = Date.now();

/*
 * Difference in milliseconds.
 */

const elapsed = end - start;

console.log(`Execution time: ${elapsed} ms`);

console.log();

console.log('========== Example 7 ==========');
console.log('Common Mistake');

/*
 * Python timestamp:
 */

const pythonEpoch = 1784980800;

/*
 * WRONG
 *
 * JavaScript thinks the number is already
 * milliseconds.
 */

const wrongDate = new Date(pythonEpoch);

console.log('Wrong:');

console.log(wrongDate);

console.log();

/*
 * CORRECT
 */

const correctDate = new Date(pythonEpoch * 1000);

console.log('Correct:');

console.log(correctDate);

console.log();

console.log('========== Summary ==========');

console.log(`
Epoch Time
----------
• Counts time since January 1, 1970 UTC.

JavaScript
----------
• Uses milliseconds.
• Date.now()
• date.getTime()

Python
------
• Uses seconds.
• datetime.now().timestamp()

Conversions
-----------
JavaScript -> Python
milliseconds / 1000

Python -> JavaScript
seconds * 1000
`);
