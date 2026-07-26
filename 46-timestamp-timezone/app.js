// https://youtu.be/2WJ-ut_XEYQ?si=WpqDgAPN2Qwr0ihM&t=598

/**
 * ==========================================================
 * JavaScript Timestamp & Time Zone Explained
 * ==========================================================
 *
 * This file explains:
 * 1. What is a Timestamp?
 * 2. What is a Time Zone?
 * 3. How JavaScript stores dates.
 * 4. Examples of using timestamps and time zones.
 *
 * ----------------------------------------------------------
 * 1. What is a Timestamp?
 * ----------------------------------------------------------
 *
 * A timestamp is a number that represents a specific moment in time.
 *
 * JavaScript timestamps are measured in:
 *
 *     Milliseconds since January 1, 1970 00:00:00 UTC
 *
 * (This date is called the Unix Epoch.)
 *
 * Example:
 *
 * Timestamp: 0
 * → January 1, 1970 00:00:00 UTC
 *
 * Timestamp: 1000
 * → 1 second later
 *
 * Timestamp: 60000
 * → 1 minute later
 *
 * ----------------------------------------------------------
 * 2. What is a Time Zone?
 * ----------------------------------------------------------
 *
 * A time zone is a region of the world that uses the same local time.
 *
 * The timestamp NEVER changes.
 * Only the displayed local time changes depending on the time zone.
 *
 * Example:
 *
 * UTC Timestamp:
 * 1785110400000
 *
 * Japan (UTC+9)
 * → Mon Jul 27 2026 09:00:00 GMT+0900
 *
 * New York (UTC-4 during daylight saving time)
 * → Sun Jul 26 2026 20:00:00 GMT-0400
 *
 * Same timestamp.
 * Different local times.
 *
 * ----------------------------------------------------------
 * 3. Getting the Current Timestamp
 * ----------------------------------------------------------
 */

const timestamp = Date.now();

console.log('Current Timestamp:');
console.log(timestamp);

/*
Example Output:

1785112345678
*/

/*
 * ----------------------------------------------------------
 * 4. Creating a Date from a Timestamp
 * ----------------------------------------------------------
 */

const date = new Date(timestamp);

console.log('\nDate Object:');
console.log(date);

/*
Example Output:

2026-07-27T13:12:25.678Z
*/

/*
 * ----------------------------------------------------------
 * 5. Displaying Local Time
 * ----------------------------------------------------------
 */

console.log('\nLocal Time:');
console.log(date.toString());

/*
Example Output (Japan):

Mon Jul 27 2026 22:12:25 GMT+0900 (Japan Standard Time)
*/

/*
 * ----------------------------------------------------------
 * 6. Displaying UTC Time
 * ----------------------------------------------------------
 */

console.log('\nUTC Time:');
console.log(date.toUTCString());

/*
Example Output:

Mon, 27 Jul 2026 13:12:25 GMT
*/

/*
 * ----------------------------------------------------------
 * 7. Displaying Different Time Zones
 * ----------------------------------------------------------
 *
 * The timestamp stays the same.
 * Only the displayed time changes.
 */

console.log('\nJapan:');
console.log(
	date.toLocaleString('en-US', {
		timeZone: 'Asia/Tokyo',
	}),
);

console.log('\nNew York:');
console.log(
	date.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	}),
);

console.log('\nLondon:');
console.log(
	date.toLocaleString('en-US', {
		timeZone: 'Europe/London',
	}),
);

/*
Example Output:

Japan:
7/27/2026, 10:12:25 PM

New York:
7/27/2026, 9:12:25 AM

London:
7/27/2026, 2:12:25 PM
*/

/*
 * ----------------------------------------------------------
 * 8. JavaScript Always Stores Time Internally as UTC
 * ----------------------------------------------------------
 *
 * Even if you create:
 *
 * new Date()
 *
 * JavaScript internally stores the date as milliseconds
 * since the Unix Epoch (UTC).
 *
 * Your computer's time zone only affects how the date is
 * displayed.
 */

const now = new Date();

console.log('\nTimestamp:');
console.log(now.getTime());

console.log('\nUTC:');
console.log(now.toUTCString());

console.log('\nLocal:');
console.log(now.toString());

/*
 * ----------------------------------------------------------
 * 9. JavaScript Timestamp vs Unix Timestamp
 * ----------------------------------------------------------
 */

const jsTimestamp = Date.now();

const unixTimestamp = Math.floor(jsTimestamp / 1000);

console.log('\nJavaScript Timestamp:');
console.log(jsTimestamp);

console.log('\nUnix Timestamp:');
console.log(unixTimestamp);

/*
Example:

JavaScript Timestamp
1785112345678

Unix Timestamp
1785112345

JavaScript uses milliseconds.
Unix timestamps use seconds.
*/

/*
 * ----------------------------------------------------------
 * 10. Calculating Elapsed Time
 * ----------------------------------------------------------
 */

const start = Date.now();

for (let i = 0; i < 10000000; i++) {
	// simulate work
}

const end = Date.now();

console.log('\nExecution Time:');
console.log(end - start + ' ms');

/*
 * ----------------------------------------------------------
 * Summary
 * ----------------------------------------------------------
 *
 * Timestamp
 * ---------
 * • A number representing a specific moment in time.
 * • JavaScript uses milliseconds.
 * • Based on January 1, 1970 UTC.
 *
 * Time Zone
 * ---------
 * • A geographic region with a local time.
 * • Does NOT change the timestamp.
 * • Only changes how the time is displayed.
 *
 * JavaScript Date
 * ---------------
 * • Stores time internally as a timestamp (UTC).
 * • Displays time according to your local time zone by default.
 *
 * Important Methods
 * -----------------
 *
 * Date.now()
 * → Current timestamp
 *
 * new Date()
 * → Current date object
 *
 * new Date(timestamp)
 * → Convert timestamp to a Date
 *
 * date.getTime()
 * → Timestamp from Date
 *
 * date.toString()
 * → Local time
 *
 * date.toUTCString()
 * → UTC time
 *
 * date.toLocaleString()
 * → Display time in a specific locale or time zone
 *
 * timeZone option
 * → Display the same timestamp in another time zone
 *
 * Example:
 *
 * const timestamp = Date.now();
 *
 * const date = new Date(timestamp);
 *
 * console.log(date.toLocaleString("en-US", {
 *     timeZone: "Asia/Tokyo"
 * }));
 *
 * console.log(date.toLocaleString("en-US", {
 *     timeZone: "America/New_York"
 * }));
 *
 * Same timestamp.
 * Different local times.
 */
