// https://youtu.be/2WJ-ut_XEYQ?si=f4aHYn5AGxT1-haD&t=5337

/**
 * =============================================================================
 * JavaScript Notes - Time Zones
 * =============================================================================
 *
 * Time zones are one of the most confusing parts of working with dates.
 *
 * The important thing to remember is:
 *
 * A JavaScript Date object DOES NOT store a time zone.
 *
 * It stores a single timestamp (milliseconds since Unix Epoch).
 *
 * The time zone only affects HOW that timestamp is displayed.
 *
 * Think of it like this:
 *
 * Timestamp (absolute moment)
 *        ↓
 *   Different Time Zones
 *        ↓
 * Different local date/time strings
 *
 * Example:
 *
 * Timestamp:
 * 1783179045000
 *
 * UTC:
 * Jul 4, 2026 15:30
 *
 * Korea:
 * Jul 5, 2026 00:30
 *
 * New York:
 * Jul 4, 2026 11:30
 *
 * Same moment.
 * Different representations.
 */

////////////////////////////////////////////////////////////////////////////////
// 1. JavaScript Date Internally
////////////////////////////////////////////////////////////////////////////////

const date = new Date();

console.log(date);

// Example:
// 2026-08-03T05:00:00.000Z

/*
Internally:

Date stores only:

milliseconds since
January 1, 1970 UTC

NOT

✓ Asia/Seoul
✓ America/New_York
✓ Europe/London

It only stores an instant in time.
*/

////////////////////////////////////////////////////////////////////////////////
// 2. Local Time Zone
////////////////////////////////////////////////////////////////////////////////

const now = new Date();

console.log(now.toString());

// Example:
// Mon Aug 03 2026 14:00:00 GMT+0900 (Korean Standard Time)

/*
toString()

Always displays
using the user's local time zone.
*/

////////////////////////////////////////////////////////////////////////////////
// 3. UTC Time
////////////////////////////////////////////////////////////////////////////////

console.log(now.toUTCString());

// Example:
// Mon, 03 Aug 2026 05:00:00 GMT

////////////////////////////////////////////////////////////////////////////////
// 4. ISO String
////////////////////////////////////////////////////////////////////////////////

console.log(now.toISOString());

// Example:
// 2026-08-03T05:00:00.000Z

/*
The "Z" means

UTC

(Zulu Time)
*/

////////////////////////////////////////////////////////////////////////////////
// 5. Local vs UTC
////////////////////////////////////////////////////////////////////////////////

const sample = new Date('2026-07-04T15:30:00Z');

console.log(sample.toString());
// Local time

console.log(sample.toUTCString());
// UTC

console.log(sample.toISOString());
// UTC ISO format

/*
These all represent
the EXACT SAME MOMENT.
*/

////////////////////////////////////////////////////////////////////////////////
// 6. Get Local Time Zone
////////////////////////////////////////////////////////////////////////////////

console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

// Example:
// Asia/Seoul

////////////////////////////////////////////////////////////////////////////////
// 7. Get UTC Offset
////////////////////////////////////////////////////////////////////////////////

console.log(new Date().getTimezoneOffset());

// Example:
// -540

/*
getTimezoneOffset()

Returns

UTC - Local Time

in minutes.

Examples:

Korea (UTC+9)
-540

Japan (UTC+9)
-540

California (UTC-8)
480

New York (UTC-5)
300

Notice:

East of UTC
negative

West of UTC
positive
*/

////////////////////////////////////////////////////////////////////////////////
// 8. Convert to Another Time Zone
////////////////////////////////////////////////////////////////////////////////

const meeting = new Date('2026-07-04T15:30:00Z');

const korea = new Intl.DateTimeFormat('ko-KR', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'Asia/Seoul',
});

console.log(korea.format(meeting));

const newYork = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'America/New_York',
});

console.log(newYork.format(meeting));

const london = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'Europe/London',
});

console.log(london.format(meeting));

/*
Same timestamp.

Different display.
*/

////////////////////////////////////////////////////////////////////////////////
// 9. Common Time Zone Names
////////////////////////////////////////////////////////////////////////////////

/*
UTC

Asia/Seoul
Asia/Tokyo
Asia/Shanghai
Asia/Singapore

America/New_York
America/Chicago
America/Denver
America/Los_Angeles

Europe/London
Europe/Paris
Europe/Berlin

Australia/Sydney
Pacific/Auckland
*/

////////////////////////////////////////////////////////////////////////////////
// 10. Why Use IANA Time Zone Names?
////////////////////////////////////////////////////////////////////////////////

/*
Good:

Asia/Seoul

America/New_York

Europe/London

Bad:

UTC+9

GMT-5

Reason:

Offsets change because of
Daylight Saving Time (DST).

Time zone names automatically
handle DST.
*/

////////////////////////////////////////////////////////////////////////////////
// 11. Daylight Saving Time
////////////////////////////////////////////////////////////////////////////////

const winter = new Date('2026-01-15T12:00:00Z');
const summer = new Date('2026-07-15T12:00:00Z');

const formatter = new Intl.DateTimeFormat('en-US', {
	timeZone: 'America/New_York',
	dateStyle: 'full',
	timeStyle: 'long',
});

console.log(formatter.format(winter));
// Eastern Standard Time (UTC-5)

console.log(formatter.format(summer));
// Eastern Daylight Time (UTC-4)

/*
Never manually add
or subtract hours.

Let Intl handle DST.
*/

////////////////////////////////////////////////////////////////////////////////
// 12. Store UTC in Database
////////////////////////////////////////////////////////////////////////////////

/*
Best Practice

Store:

2026-07-04T15:30:00Z

NOT

2026-07-04 15:30

Reason:

UTC is universal.

Convert to the user's
time zone only when displaying.
*/

////////////////////////////////////////////////////////////////////////////////
// 13. Parsing ISO Strings
////////////////////////////////////////////////////////////////////////////////

const utcDate = new Date('2026-07-04T15:30:00Z');

console.log(utcDate);

/*
"Z"

means UTC.
*/

////////////////////////////////////////////////////////////////////////////////
// 14. Parsing Without Time Zone
////////////////////////////////////////////////////////////////////////////////

const localDate = new Date('2026-07-04T15:30:00');

console.log(localDate);

/*
No "Z"

No offset

Means:

Interpret as LOCAL time.

This can produce different
timestamps on different computers.
*/

////////////////////////////////////////////////////////////////////////////////
// 15. Parsing With Offset
////////////////////////////////////////////////////////////////////////////////

const offsetDate = new Date('2026-07-04T15:30:00+09:00');

console.log(offsetDate);

/*
+09:00

means

UTC+9

JavaScript converts
it to the correct UTC timestamp.
*/

////////////////////////////////////////////////////////////////////////////////
// 16. Comparing Dates
////////////////////////////////////////////////////////////////////////////////

const a = new Date('2026-07-04T15:30:00Z');

const b = new Date('2026-07-05T00:30:00+09:00');

console.log(a.getTime());
console.log(b.getTime());

console.log(a.getTime() === b.getTime());
// true

/*
Different strings.

Same moment.
*/

////////////////////////////////////////////////////////////////////////////////
// 17. Scheduling Meetings
////////////////////////////////////////////////////////////////////////////////

const meetingUTC = new Date('2026-07-04T15:30:00Z');

const users = ['Asia/Seoul', 'America/New_York', 'Europe/London'];

for (const tz of users) {
	console.log(
		tz,
		new Intl.DateTimeFormat('en', {
			dateStyle: 'medium',
			timeStyle: 'short',
			timeZone: tz,
		}).format(meetingUTC),
	);
}

/*
Always store
meeting time in UTC.

Display according
to each user's time zone.
*/

////////////////////////////////////////////////////////////////////////////////
// 18. Avoid Manual Hour Calculations
////////////////////////////////////////////////////////////////////////////////

// ❌ Bad

const bad = new Date();

bad.setHours(bad.getHours() + 9);

// DST problems.

// ✔ Good

console.log(
	new Intl.DateTimeFormat('en-US', {
		timeZone: 'Asia/Seoul',
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(new Date()),
);

////////////////////////////////////////////////////////////////////////////////
// 19. Useful Date Methods
////////////////////////////////////////////////////////////////////////////////

const d = new Date();

console.log(d.toString()); // Local
console.log(d.toUTCString()); // UTC
console.log(d.toISOString()); // ISO UTC
console.log(d.getTime()); // Timestamp
console.log(d.getTimezoneOffset()); // Offset in minutes

////////////////////////////////////////////////////////////////////////////////
// 20. Best Practices
////////////////////////////////////////////////////////////////////////////////

/*
✓ Store timestamps in UTC.

✓ Exchange dates using ISO 8601 strings.

✓ Include "Z" or an explicit offset in date strings.

✓ Use Intl.DateTimeFormat() to display dates.

✓ Use IANA time zone names
  (Asia/Seoul, America/New_York).

✓ Never manually adjust hours for time zone conversion.

✓ Let Intl automatically handle DST.

✓ Compare dates using timestamps
  (getTime()).

✓ Treat Date objects as absolute instants, not "local times."

✓ Remember that a Date object has no intrinsic time zone—only formatting methods apply one.
*/

////////////////////////////////////////////////////////////////////////////////
// 21. Summary
////////////////////////////////////////////////////////////////////////////////

/*
Date stores:
-------------
Timestamp only

Display:
---------
Local time
UTC
Any IANA time zone via Intl.DateTimeFormat()

Useful methods:
---------------
getTime()
toISOString()
toUTCString()
toString()
getTimezoneOffset()

Useful Intl features:
---------------------
Intl.DateTimeFormat()

resolvedOptions().timeZone

timeZone option

Examples:

Asia/Seoul
America/New_York
Europe/London
UTC

Golden Rules:
-------------
1. Store in UTC.
2. Transmit ISO 8601 strings.
3. Display in the user's time zone.
4. Never hardcode UTC offsets.
5. Use IANA time zone names so DST is handled automatically.
*/
