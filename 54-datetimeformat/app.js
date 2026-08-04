// https://youtu.be/2WJ-ut_XEYQ?si=yMKpXJUSfwGdIT3k&t=3956

/**
 * =============================================================================
 * JavaScript Notes - Intl.DateTimeFormat()
 * =============================================================================
 *
 * Intl.DateTimeFormat is the modern way to format dates and times according
 * to different languages (locales) and regions.
 *
 * Instead of manually building date strings, use Intl.DateTimeFormat so the
 * formatting follows local conventions automatically.
 *
 * Documentation:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 *
 * -----------------------------------------------------------------------------
 * Basic Syntax
 * -----------------------------------------------------------------------------
 *
 * const formatter = new Intl.DateTimeFormat(locale, options);
 * const result = formatter.format(date);
 *
 * locale:
 *   - "en-US"
 *   - "en-GB"
 *   - "ko-KR"
 *   - "ja-JP"
 *   - "fr-FR"
 *   - etc.
 *
 * options:
 *   Object describing how the date should look.
 *
 */

////////////////////////////////////////////////////////////////////////////////
// Basic Example
////////////////////////////////////////////////////////////////////////////////

const date = new Date('2026-07-04T15:30:45Z');

const us = new Intl.DateTimeFormat('en-US');
console.log(us.format(date));
// Example:
// 7/4/2026

const korea = new Intl.DateTimeFormat('ko-KR');
console.log(korea.format(date));
// Example:
// 2026. 7. 5.

const japan = new Intl.DateTimeFormat('ja-JP');
console.log(japan.format(date));
// Example:
// 2026/7/5

////////////////////////////////////////////////////////////////////////////////
// Formatting Styles
////////////////////////////////////////////////////////////////////////////////

const formatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
});

console.log(formatter.format(date));
// Saturday, July 4, 2026

const formatter2 = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'long',
});

console.log(formatter2.format(date));
// July 4, 2026

const formatter3 = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
});

console.log(formatter3.format(date));
// Jul 4, 2026

const formatter4 = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'short',
});

console.log(formatter4.format(date));
// 7/4/26

////////////////////////////////////////////////////////////////////////////////
// Time Styles
////////////////////////////////////////////////////////////////////////////////

const timeFormatter = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'full',
	timeZone: 'UTC',
});

console.log(timeFormatter.format(date));
// 3:30:45 PM Coordinated Universal Time

const timeFormatter2 = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'short',
	timeZone: 'UTC',
});

console.log(timeFormatter2.format(date));
// 3:30 PM

////////////////////////////////////////////////////////////////////////////////
// Date + Time Together
////////////////////////////////////////////////////////////////////////////////

const fullFormatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'UTC',
});

console.log(fullFormatter.format(date));
// Saturday, July 4, 2026 at 3:30:45 PM UTC

////////////////////////////////////////////////////////////////////////////////
// Custom Formatting
////////////////////////////////////////////////////////////////////////////////

const custom = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

console.log(custom.format(date));
// July 4, 2026

////////////////////////////////////////////////////////////////////////////////
// Numeric Date
////////////////////////////////////////////////////////////////////////////////

const numeric = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
});

console.log(numeric.format(date));
// 07/04/2026

////////////////////////////////////////////////////////////////////////////////
// Weekday
////////////////////////////////////////////////////////////////////////////////

const weekday = new Intl.DateTimeFormat('en-US', {
	weekday: 'long',
});

console.log(weekday.format(date));
// Saturday

const shortWeekday = new Intl.DateTimeFormat('en-US', {
	weekday: 'short',
});

console.log(shortWeekday.format(date));
// Sat

////////////////////////////////////////////////////////////////////////////////
// Month Names
////////////////////////////////////////////////////////////////////////////////

const monthLong = new Intl.DateTimeFormat('en-US', {
	month: 'long',
});

console.log(monthLong.format(date));
// July

const monthShort = new Intl.DateTimeFormat('en-US', {
	month: 'short',
});

console.log(monthShort.format(date));
// Jul

const monthNarrow = new Intl.DateTimeFormat('en-US', {
	month: 'narrow',
});

console.log(monthNarrow.format(date));
// J

////////////////////////////////////////////////////////////////////////////////
// 12-Hour vs 24-Hour Clock
////////////////////////////////////////////////////////////////////////////////

const twelveHour = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
	timeZone: 'UTC',
});

console.log(twelveHour.format(date));
// 3:30 PM

const twentyFourHour = new Intl.DateTimeFormat('en-GB', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
	timeZone: 'UTC',
});

console.log(twentyFourHour.format(date));
// 15:30

////////////////////////////////////////////////////////////////////////////////
// Time Zones
////////////////////////////////////////////////////////////////////////////////

// Same instant displayed in different time zones.

const utc = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'UTC',
});

console.log(utc.format(date));

const seoul = new Intl.DateTimeFormat('ko-KR', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'Asia/Seoul',
});

console.log(seoul.format(date));

const newYork = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'America/New_York',
});

console.log(newYork.format(date));

////////////////////////////////////////////////////////////////////////////////
// Common Time Zone Names
////////////////////////////////////////////////////////////////////////////////

/*
UTC

Asia/Seoul
Asia/Tokyo
Asia/Shanghai

America/New_York
America/Los_Angeles
America/Chicago

Europe/London
Europe/Paris
Europe/Berlin

Australia/Sydney
*/

////////////////////////////////////////////////////////////////////////////////
// Time Zone Name
////////////////////////////////////////////////////////////////////////////////

const tzName = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: 'numeric',
	timeZone: 'America/New_York',
	timeZoneName: 'long',
});

console.log(tzName.format(date));
// Example:
// 11:30 AM Eastern Daylight Time

////////////////////////////////////////////////////////////////////////////////
// Supported timeZoneName values
////////////////////////////////////////////////////////////////////////////////

/*
short
long
shortOffset
longOffset
shortGeneric
longGeneric
*/

////////////////////////////////////////////////////////////////////////////////
// formatToParts()
////////////////////////////////////////////////////////////////////////////////

// Useful when you need individual pieces instead of one string.

const parts = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}).formatToParts(date);

console.log(parts);

/*
[
  { type: 'month', value: 'July' },
  { type: 'literal', value: ' ' },
  { type: 'day', value: '4' },
  { type: 'literal', value: ', ' },
  { type: 'year', value: '2026' }
]
*/

////////////////////////////////////////////////////////////////////////////////
// Extract Individual Parts
////////////////////////////////////////////////////////////////////////////////

const month = parts.find((p) => p.type === 'month').value;
const day = parts.find((p) => p.type === 'day').value;
const year = parts.find((p) => p.type === 'year').value;

console.log(month);
console.log(day);
console.log(year);

////////////////////////////////////////////////////////////////////////////////
// formatRange()
////////////////////////////////////////////////////////////////////////////////

// Formats a date range nicely.

const start = new Date('2026-07-01');
const end = new Date('2026-07-05');

const rangeFormatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
});

console.log(rangeFormatter.formatRange(start, end));
// Jul 1–5, 2026

////////////////////////////////////////////////////////////////////////////////
// formatRangeToParts()
////////////////////////////////////////////////////////////////////////////////

console.log(rangeFormatter.formatRangeToParts(start, end));

// Returns an array of structured parts for custom range formatting.

////////////////////////////////////////////////////////////////////////////////
// resolvedOptions()
////////////////////////////////////////////////////////////////////////////////

// Shows the actual configuration being used.

const info = new Intl.DateTimeFormat('en-US').resolvedOptions();

console.log(info);

/*
{
  locale: 'en-US',
  calendar: 'gregory',
  numberingSystem: 'latn',
  timeZone: 'Asia/Seoul',
  ...
}
*/

////////////////////////////////////////////////////////////////////////////////
// Get User's Locale
////////////////////////////////////////////////////////////////////////////////

console.log(Intl.DateTimeFormat().resolvedOptions().locale);

// Example:
// en-US
// ko-KR
// ja-JP

////////////////////////////////////////////////////////////////////////////////
// Get User's Time Zone
////////////////////////////////////////////////////////////////////////////////

console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

// Example:
// Asia/Seoul
// America/New_York

////////////////////////////////////////////////////////////////////////////////
// Reuse Formatter (Recommended)
////////////////////////////////////////////////////////////////////////////////

// Creating a formatter is relatively expensive.
// If formatting many dates, create it once and reuse it.

const reusableFormatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
});

const dates = [new Date(), new Date(Date.now() + 86400000), new Date(Date.now() + 86400000 * 2)];

for (const d of dates) {
	console.log(reusableFormatter.format(d));
}

////////////////////////////////////////////////////////////////////////////////
// Locale Differences
////////////////////////////////////////////////////////////////////////////////

const sample = new Date('2026-12-25T10:15:30Z');

console.log(new Intl.DateTimeFormat('en-US').format(sample));
// 12/25/2026

console.log(new Intl.DateTimeFormat('en-GB').format(sample));
// 25/12/2026

console.log(new Intl.DateTimeFormat('ko-KR').format(sample));
// 2026. 12. 25.

console.log(new Intl.DateTimeFormat('ja-JP').format(sample));
// 2026/12/25

console.log(new Intl.DateTimeFormat('de-DE').format(sample));
// 25.12.2026

////////////////////////////////////////////////////////////////////////////////
// Common Option Values
////////////////////////////////////////////////////////////////////////////////

/*
weekday
--------
"long"
"short"
"narrow"

year
----
"numeric"
"2-digit"

month
-----
"numeric"
"2-digit"
"long"
"short"
"narrow"

day
---
"numeric"
"2-digit"

hour
----
"numeric"
"2-digit"

minute
------
"numeric"
"2-digit"

second
------
"numeric"
"2-digit"

hour12
------
true
false

dateStyle
---------
"full"
"long"
"medium"
"short"

timeStyle
---------
"full"
"long"
"medium"
"short"

timeZone
--------
"UTC"
"Asia/Seoul"
"America/New_York"
etc.
*/

////////////////////////////////////////////////////////////////////////////////
// Best Practices
////////////////////////////////////////////////////////////////////////////////

/*
✓ Use Intl.DateTimeFormat instead of manually concatenating date strings.

✓ Always specify the locale if consistent formatting is required.

✓ Specify timeZone when displaying dates for users in different regions.

✓ Reuse formatter instances when formatting many dates.

✓ Use formatToParts() when you need custom layouts.

✓ Use formatRange() for displaying date ranges.

✓ Use resolvedOptions() to inspect the active locale and time zone.

✓ Prefer Intl.DateTimeFormat over Date.prototype.toLocaleString()
  when formatting repeatedly because you can reuse the formatter.
*/

////////////////////////////////////////////////////////////////////////////////
// Summary
////////////////////////////////////////////////////////////////////////////////

/*
new Intl.DateTimeFormat(locale, options)

Main methods:
--------------
format(date)
formatToParts(date)
formatRange(start, end)
formatRangeToParts(start, end)
resolvedOptions()

Common options:
---------------
dateStyle
timeStyle
weekday
year
month
day
hour
minute
second
hour12
timeZone
timeZoneName

Most common use case:
---------------------

const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Seoul"
});

console.log(formatter.format(new Date()));
*/
