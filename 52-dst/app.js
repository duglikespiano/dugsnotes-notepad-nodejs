// https://youtu.be/2WJ-ut_XEYQ?si=icyGJNIli8XGLRW2&t=3297

/**
 * ============================================================
 * Daylight Saving Time (DST) in JavaScript
 * ============================================================
 *
 * What is DST?
 * ------------
 * Daylight Saving Time (DST) is the practice of moving clocks
 * forward by 1 hour during warmer months to make better use
 * of daylight.
 *
 * Example:
 * Standard Time:
 *      8:00 AM
 *
 * DST starts:
 *      Clocks move forward 1 hour
 *      8:00 AM -> 9:00 AM
 *
 * DST ends:
 *      Clocks move backward 1 hour
 *      9:00 AM -> 8:00 AM
 *
 * Not every country observes DST.
 *
 * Examples:
 * - United States (Most states): Uses DST
 * - Canada: Uses DST
 * - United Kingdom: Uses DST
 * - Germany: Uses DST
 * - Japan: No DST
 * - South Korea: No DST
 *
 * ------------------------------------------------------------
 * Important Rule
 * ------------------------------------------------------------
 *
 * Never manually add or subtract one hour for DST.
 *
 * JavaScript's Date object already knows the DST rules
 * for the selected time zone.
 *
 * Let JavaScript handle it automatically.
 */

/*============================================================
=            Example 1 - JavaScript handles DST              =
============================================================*/

// America/New_York enters DST on March 9, 2025.
// At 2:00 AM, clocks jump to 3:00 AM.

const beforeDST = new Date('2025-03-09T01:30:00-05:00');

console.log(beforeDST.toString());

// If you add one hour...

beforeDST.setHours(beforeDST.getHours() + 1);

console.log(beforeDST.toString());

/*
Output (New York):

Sun Mar 09 2025 01:30:00 GMT-0500
Sun Mar 09 2025 03:30:00 GMT-0400

Notice:

There is NO 2:30 AM.

JavaScript skipped it automatically because DST started.
*/

/*============================================================
=        Example 2 - Converting to another timezone          =
============================================================*/

const utcDate = new Date('2025-07-01T12:00:00Z');

console.log(
	utcDate.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	}),
);

console.log(
	utcDate.toLocaleString('en-US', {
		timeZone: 'Asia/Tokyo',
	}),
);

/*
Possible output:

America/New_York
7/1/2025, 8:00:00 AM

Asia/Tokyo
7/1/2025, 9:00:00 PM

Notice:

New York is UTC-4 because DST is active.

JavaScript automatically uses the correct offset.
*/

/*============================================================
=             Example 3 - Winter vs Summer                   =
============================================================*/

const winter = new Date('2025-01-15T12:00:00Z');
const summer = new Date('2025-07-15T12:00:00Z');

console.log(
	winter.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	}),
);

console.log(
	summer.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	}),
);

/*
Winter:

12:00 UTC
↓

7:00 AM (UTC-5)

Summer:

12:00 UTC
↓

8:00 AM (UTC-4)

JavaScript automatically changes the offset.
*/

/*============================================================
=              Example 4 - Timezone Offset                   =
============================================================*/

const date = new Date();

console.log(date.getTimezoneOffset());

/*
Returns:

Difference (in minutes) between local time and UTC.

Example:

Japan (UTC+9)

-540

New York (Winter)

300

New York (Summer)

240

DST changes the offset automatically.

Do NOT assume this value is constant throughout the year.
*/

/*============================================================
=            Example 5 - Store UTC in databases              =
============================================================*/

// Good practice:

const now = new Date();

console.log(now.toISOString());

/*
Example:

2025-07-01T15:45:12.321Z

Always store UTC in your database.

Later, display it in the user's local timezone:

date.toLocaleString()

or

date.toLocaleString("en-US", {
    timeZone: "America/New_York"
})

This avoids DST problems.
*/

/*============================================================
=            Example 6 - Bad Practice                        =
============================================================*/

// ❌ Don't do this

const date1 = new Date();

// Someone manually adds one hour...

date1.setHours(date1.getHours() + 1);

// This may be WRONG if DST already applies.

/*============================================================
=            Example 7 - Good Practice                       =
============================================================*/

// ✅ Let JavaScript calculate local time

const utc = new Date('2025-07-01T12:00:00Z');

const local = utc.toLocaleString('en-US', {
	timeZone: 'America/New_York',
});

console.log(local);

// JavaScript automatically applies DST if needed.

/*============================================================
=          Detect whether DST is currently active            =
============================================================*/

/**
 * Returns true if the current date is in Daylight Saving Time.
 *
 * Note:
 * This only works in regions that observe DST.
 * Countries like Japan and South Korea will always return false.
 */
function isDST(date = new Date()) {
	const january = new Date(date.getFullYear(), 0, 1);
	const july = new Date(date.getFullYear(), 6, 1);

	const standardOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());

	return date.getTimezoneOffset() < standardOffset;
}

console.log(isDST());

/*============================================================
=                      Summary                               =
============================================================*/

/*
✓ DST = Daylight Saving Time

✓ Some countries move clocks forward by 1 hour in summer.

✓ JavaScript Date already knows DST rules.

✓ Never manually adjust for DST.

✓ Store timestamps in UTC.

✓ Display dates using:

    toLocaleString()

or

    Intl.DateTimeFormat()

with a specific timeZone.

✓ getTimezoneOffset() may change during the year because of DST.

✓ Countries like Japan and South Korea do not currently observe DST.

Best Practice:

Database
    ↓
Store UTC (toISOString())

Frontend
    ↓
Convert to the user's timezone with toLocaleString()

JavaScript handles DST automatically.
*/
