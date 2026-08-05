// https://youtu.be/2WJ-ut_XEYQ?si=wfXydGpz-4alvVES&t=5485

/**
 * =============================================================================
 * JavaScript Notes - Relative Time ("2 days ago")
 * =============================================================================
 *
 * Relative time expresses the difference between two dates in a human-friendly
 * way instead of showing an exact date.
 *
 * Examples:
 *
 * 5 seconds ago
 * 3 minutes ago
 * yesterday
 * 2 days ago
 * last week
 * next month
 * in 3 years
 *
 * JavaScript provides the built-in Intl.RelativeTimeFormat API for this.
 *
 * Documentation:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 */

////////////////////////////////////////////////////////////////////////////////
// 1. Basic Syntax
////////////////////////////////////////////////////////////////////////////////

/*
const rtf = new Intl.RelativeTimeFormat(locale, options);

rtf.format(value, unit);

value
-----
Negative -> past
Positive -> future

unit
----
"second"
"minute"
"hour"
"day"
"week"
"month"
"quarter"
"year"
*/

////////////////////////////////////////////////////////////////////////////////
// 2. Basic Example
////////////////////////////////////////////////////////////////////////////////

const rtf = new Intl.RelativeTimeFormat('en');

console.log(rtf.format(-2, 'day'));
// 2 days ago

console.log(rtf.format(-1, 'day'));
// 1 day ago

console.log(rtf.format(3, 'day'));
// in 3 days

////////////////////////////////////////////////////////////////////////////////
// 3. Different Languages
////////////////////////////////////////////////////////////////////////////////

const english = new Intl.RelativeTimeFormat('en');
const korean = new Intl.RelativeTimeFormat('ko');
const japanese = new Intl.RelativeTimeFormat('ja');

console.log(english.format(-2, 'day'));
// 2 days ago

console.log(korean.format(-2, 'day'));
// 2일 전

console.log(japanese.format(-2, 'day'));
// 2 日前

////////////////////////////////////////////////////////////////////////////////
// 4. Supported Units
////////////////////////////////////////////////////////////////////////////////

console.log(rtf.format(-30, 'second'));
// 30 seconds ago

console.log(rtf.format(-10, 'minute'));
// 10 minutes ago

console.log(rtf.format(-5, 'hour'));
// 5 hours ago

console.log(rtf.format(-3, 'day'));
// 3 days ago

console.log(rtf.format(-2, 'week'));
// 2 weeks ago

console.log(rtf.format(-6, 'month'));
// 6 months ago

console.log(rtf.format(-1, 'year'));
// 1 year ago

////////////////////////////////////////////////////////////////////////////////
// 5. Future Dates
////////////////////////////////////////////////////////////////////////////////

console.log(rtf.format(5, 'minute'));
// in 5 minutes

console.log(rtf.format(3, 'day'));
// in 3 days

console.log(rtf.format(2, 'month'));
// in 2 months

////////////////////////////////////////////////////////////////////////////////
// 6. style Option
////////////////////////////////////////////////////////////////////////////////

const long = new Intl.RelativeTimeFormat('en', {
	style: 'long',
});

const short = new Intl.RelativeTimeFormat('en', {
	style: 'short',
});

const narrow = new Intl.RelativeTimeFormat('en', {
	style: 'narrow',
});

console.log(long.format(-2, 'day'));
// 2 days ago

console.log(short.format(-2, 'day'));
// 2 days ago (or abbreviated depending on locale)

console.log(narrow.format(-2, 'day'));
// 2d ago

////////////////////////////////////////////////////////////////////////////////
// 7. numeric Option
////////////////////////////////////////////////////////////////////////////////

const always = new Intl.RelativeTimeFormat('en', {
	numeric: 'always',
});

const auto = new Intl.RelativeTimeFormat('en', {
	numeric: 'auto',
});

console.log(always.format(-1, 'day'));
// 1 day ago

console.log(auto.format(-1, 'day'));
// yesterday

console.log(auto.format(1, 'day'));
// tomorrow

console.log(auto.format(0, 'day'));
// today

/*
numeric

always
-------
Always use numbers.

auto
----
Uses natural words when possible.
*/

////////////////////////////////////////////////////////////////////////////////
// 8. Creating "x Minutes Ago"
////////////////////////////////////////////////////////////////////////////////

const postDate = new Date(Date.now() - 5 * 60 * 1000);

const diffMinutes = Math.round((postDate.getTime() - Date.now()) / (1000 * 60));

console.log(rtf.format(diffMinutes, 'minute'));

// 5 minutes ago

////////////////////////////////////////////////////////////////////////////////
// 9. Calculating Relative Time
////////////////////////////////////////////////////////////////////////////////

const now = new Date();

const oldDate = new Date('2026-07-30T12:00:00Z');

const diffMs = oldDate.getTime() - now.getTime();

const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

console.log(rtf.format(diffDays, 'day'));

////////////////////////////////////////////////////////////////////////////////
// 10. Helper Function
////////////////////////////////////////////////////////////////////////////////

function formatRelative(date) {
	const now = Date.now();

	const diff = date.getTime() - now;

	const seconds = Math.round(diff / 1000);

	const minutes = Math.round(seconds / 60);

	const hours = Math.round(minutes / 60);

	const days = Math.round(hours / 24);

	const months = Math.round(days / 30);

	const years = Math.round(days / 365);

	const formatter = new Intl.RelativeTimeFormat('en', {
		numeric: 'auto',
	});

	if (Math.abs(seconds) < 60) return formatter.format(seconds, 'second');

	if (Math.abs(minutes) < 60) return formatter.format(minutes, 'minute');

	if (Math.abs(hours) < 24) return formatter.format(hours, 'hour');

	if (Math.abs(days) < 30) return formatter.format(days, 'day');

	if (Math.abs(months) < 12) return formatter.format(months, 'month');

	return formatter.format(years, 'year');
}

////////////////////////////////////////////////////////////////////////////////
// 11. Example Usage
////////////////////////////////////////////////////////////////////////////////

console.log(formatRelative(new Date(Date.now() - 5000)));
// 5 seconds ago

console.log(formatRelative(new Date(Date.now() - 3600000)));
// 1 hour ago

console.log(formatRelative(new Date(Date.now() + 86400000)));
// tomorrow

////////////////////////////////////////////////////////////////////////////////
// 12. Formatting Blog Posts
////////////////////////////////////////////////////////////////////////////////

const posts = [new Date(Date.now() - 120000), new Date(Date.now() - 86400000), new Date(Date.now() - 86400000 * 10)];

for (const post of posts) {
	console.log(formatRelative(post));
}

/*
Example:

2 minutes ago

yesterday

10 days ago
*/

////////////////////////////////////////////////////////////////////////////////
// 13. formatToParts()
////////////////////////////////////////////////////////////////////////////////

const parts = rtf.formatToParts(-5, 'day');

console.log(parts);

/*
[
  { type: "integer", value: "5" },
  { type: "literal", value: " days ago" }
]
*/

////////////////////////////////////////////////////////////////////////////////
// 14. Why Use Intl.RelativeTimeFormat?
////////////////////////////////////////////////////////////////////////////////

/*
Instead of manually writing:

if (days === 1)
    "1 day ago"
else
    "2 days ago"

or translating into
20 languages...

Use:

Intl.RelativeTimeFormat()

It handles:

✓ Localization

✓ Grammar

✓ Plural rules

✓ Future vs Past

✓ Natural wording
*/

////////////////////////////////////////////////////////////////////////////////
// 15. Common Units
////////////////////////////////////////////////////////////////////////////////

/*
second

minute

hour

day

week

month

quarter

year
*/

////////////////////////////////////////////////////////////////////////////////
// 16. Best Practices
////////////////////////////////////////////////////////////////////////////////

/*
✓ Use Intl.RelativeTimeFormat() instead of manually building strings.

✓ Store dates as Date objects or timestamps.

✓ Calculate the time difference in milliseconds.

✓ Convert to the largest meaningful unit
  (seconds, minutes, hours, days, etc.).

✓ Use numeric: "auto"
  if you want words like:
  yesterday
  today
  tomorrow

✓ Reuse the formatter if formatting many values.

✓ Use Intl.DateTimeFormat() when you need an exact date,
  and Intl.RelativeTimeFormat() when you need a human-readable difference.
*/

////////////////////////////////////////////////////////////////////////////////
// 17. Summary
////////////////////////////////////////////////////////////////////////////////

/*
Create formatter:
-----------------
const rtf = new Intl.RelativeTimeFormat(
    "en",
    {
        numeric: "auto",
        style: "long"
    }
);

Methods:
--------
format(value, unit)

formatToParts(value, unit)

Past:
-----
rtf.format(-2, "day")

→ 2 days ago

Future:
-------
rtf.format(3, "day")

→ in 3 days

Natural wording:
----------------
rtf.format(-1, "day")

→ yesterday

rtf.format(0, "day")

→ today

rtf.format(1, "day")

→ tomorrow

Supported Units:
----------------
second
minute
hour
day
week
month
quarter
year
*/
