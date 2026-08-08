// https://youtu.be/2WJ-ut_XEYQ?si=lsoqlHFaCxvSL2t7&t=7321

/**
 * ==========================================================
 * JavaScript Date API vs Temporal API
 * ==========================================================
 *
 * JavaScript currently has two date/time APIs:
 *
 * 1. Date (Legacy API)
 * 2. Temporal (Modern API)
 *
 * Date has existed since the first version of JavaScript.
 *
 * Temporal was designed to solve many of Date's problems.
 *
 * Think of it like:
 *
 * Date
 *   = Old API
 *   = Works everywhere
 *   = Difficult to use correctly
 *
 * Temporal
 *   = Modern API
 *   = Immutable
 *   = Timezone-aware
 *   = Easier to understand
 *
 */

/*===========================================================
=            Comparison                                     =
===========================================================*/

/*

+-------------------------+---------------+----------------+
| Feature                 | Date          | Temporal       |
+-------------------------+---------------+----------------+
| Immutable               | ❌            | ✅             |
| Timezone-aware          | Limited       | Excellent      |
| DST handling            | Difficult     | Built-in       |
| Nanosecond precision    | ❌            | ✅             |
| Parsing                 | Inconsistent  | Consistent     |
| Date arithmetic         | Difficult     | Easy           |
| Multiple date types     | ❌            | ✅             |
| Predictable             | Sometimes     | Yes            |
| Legacy compatible       | Excellent     | Growing        |
+-------------------------+---------------+----------------+

*/

/*===========================================================
=            1. Current Time                                =
===========================================================*/

/*
Date
*/

const nowDate = new Date();

console.log(nowDate);

/*
Temporal
*/

const nowTemporal = Temporal.Now.instant();

console.log(nowTemporal);

/*===========================================================
=            2. Creating a Date                             =
===========================================================*/

/*
Date
*/

const date1 = new Date('2026-08-03');

console.log(date1);

/*
The interpretation may vary depending on timezone.
*/

/*
Temporal
*/

const date2 = Temporal.PlainDate.from('2026-08-03');

console.log(date2);

/*
Always means:

August 3, 2026

No timezone confusion.
*/

/*===========================================================
=            3. Mutability                                  =
===========================================================*/

/*
Date objects are mutable.
*/

const d = new Date('2026-08-03');

d.setDate(10);

console.log(d);

/*
Original object changed.
*/

/*
Temporal objects are immutable.
*/

const t1 = Temporal.PlainDate.from('2026-08-03');

const t2 = t1.add({
	days: 7,
});

console.log(t1);

/*
2026-08-03
*/

console.log(t2);

/*
2026-08-10
*/

/*
Original object never changes.
*/

/*===========================================================
=            4. Adding Days                                 =
===========================================================*/

/*
Date
*/

const date = new Date('2026-08-03');

date.setDate(date.getDate() + 5);

console.log(date);

/*
Need getter + setter.
*/

/*
Temporal
*/

const temporal = Temporal.PlainDate.from('2026-08-03');

const result = temporal.add({
	days: 5,
});

console.log(result);

/*
Much easier.
*/

/*===========================================================
=            5. Subtracting Days                            =
===========================================================*/

/*
Date
*/

const d3 = new Date('2026-08-10');

d3.setDate(d3.getDate() - 3);

console.log(d3);

/*
Temporal
*/

const t3 = Temporal.PlainDate.from('2026-08-10');

console.log(
	t3.subtract({
		days: 3,
	}),
);

/*===========================================================
=            6. Difference Between Dates                    =
===========================================================*/

/*
Date
*/

const start = new Date('2026-08-01');

const end = new Date('2026-08-10');

const diffMs = end - start;

const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log(diffDays);

/*
Need manual calculations.
*/

/*
Temporal
*/

const start2 = Temporal.PlainDate.from('2026-08-01');

const end2 = Temporal.PlainDate.from('2026-08-10');

const diff = start2.until(end2);

console.log(diff.days);

/*
9
*/

/*===========================================================
=            7. Date Components                             =
===========================================================*/

/*
Date
*/

const sample = new Date();

console.log(sample.getFullYear());

console.log(sample.getMonth());

/*
7

Months are zero-based.

0 January
1 February
...
7 August
*/

console.log(sample.getDate());

/*
Temporal
*/

const sample2 = Temporal.PlainDate.from('2026-08-03');

console.log(sample2.year);

console.log(sample2.month);

console.log(sample2.day);

/*
Months are 1-based.

1 January

8 August
*/

/*===========================================================
=            8. Timezone Conversion                         =
===========================================================*/

/*
Date
*/

const utc = new Date('2026-08-03T00:00:00Z');

console.log(
	utc.toLocaleString('en-US', {
		timeZone: 'Asia/Seoul',
	}),
);

/*
Need Intl API.
*/

/*
Temporal
*/

const instant = Temporal.Instant.from('2026-08-03T00:00:00Z');

const seoul = instant.toZonedDateTimeISO('Asia/Seoul');

console.log(seoul);

/*
Timezone becomes part of the object.
*/

/*===========================================================
=            9. DST Handling                                =
===========================================================*/

/*
Date

DST changes can produce unexpected results.

You usually have to rely on
Intl.DateTimeFormat()
or timezone libraries.
*/

/*
Temporal

Timezone and DST are built into
ZonedDateTime.

Arithmetic correctly accounts for
DST transitions.
*/

const meeting = Temporal.ZonedDateTime.from('2026-03-08T01:30:00-08:00[America/Los_Angeles]');

console.log(
	meeting.add({
		hours: 2,
	}),
);

/*
Correctly skips the missing DST hour.
*/

/*===========================================================
=            10. Precision                                  =
===========================================================*/

/*
Date

Milliseconds only.
*/

const oldDate = new Date();

console.log(oldDate.getTime());

/*
Temporal

Nanosecond precision.
*/

const instant2 = Temporal.Now.instant();

console.log(instant2.epochNanoseconds);

/*===========================================================
=            11. Parsing                                    =
===========================================================*/

/*
Date
*/

const p1 = new Date('2026-08-03');

console.log(p1);

/*
Different environments historically
interpreted some date strings differently.
*/

/*
Temporal
*/

const p2 = Temporal.PlainDate.from('2026-08-03');

console.log(p2);

/*
Strict ISO parsing.

Much more predictable.
*/

/*===========================================================
=            12. Different Types                            =
===========================================================*/

/*
Date

Everything is Date.

Date
Date + Time
UTC
Local
Timezone

All represented by one object.
*/

const everything = new Date();

/*
Temporal

Different objects for different jobs.
*/

Temporal.Instant;

Temporal.PlainDate;

Temporal.PlainTime;

Temporal.PlainDateTime;

Temporal.ZonedDateTime;

Temporal.Duration;

Temporal.PlainYearMonth;

Temporal.PlainMonthDay;

/*===========================================================
=            13. Formatting                                 =
===========================================================*/

/*
Date
*/

const current = new Date();

console.log(current.toLocaleString());

/*
Temporal
*/

const current2 = Temporal.Now.instant();

console.log(current2.toString());

/*===========================================================
=            14. When to Use Date                           =
===========================================================*/

/*

Use Date when:

✓ Supporting older browsers
✓ Maintaining legacy projects
✓ Simple timestamps
✓ Existing libraries require Date

*/

/*===========================================================
=            15. When to Use Temporal                       =
===========================================================*/

/*

Use Temporal when:

✓ Building new applications
✓ Working with timezones
✓ Scheduling events
✓ Calendar applications
✓ Travel applications
✓ Booking systems
✓ Financial software
✓ International applications
✓ Date calculations
✓ Recurring events

*/

/*===========================================================
=            16. Date -> Temporal                           =
===========================================================*/

/*
Convert Date to Temporal.Instant
*/

const legacyDate = new Date();

const instantFromDate = Temporal.Instant.fromEpochMilliseconds(legacyDate.getTime());

console.log(instantFromDate);

/*===========================================================
=            17. Temporal -> Date                           =
===========================================================*/

/*
Convert Temporal.Instant to Date
*/

const instant3 = Temporal.Now.instant();

const dateFromTemporal = new Date(instant3.epochMilliseconds);

console.log(dateFromTemporal);

/*===========================================================
=            Cheat Sheet                                    =
===========================================================*/

/*

DATE

new Date()

getFullYear()

getMonth()

getDate()

getHours()

getMinutes()

setDate()

setMonth()

getTime()

toISOString()

toLocaleString()



TEMPORAL

Temporal.Now.instant()

Temporal.Instant

Temporal.PlainDate

Temporal.PlainTime

Temporal.PlainDateTime

Temporal.ZonedDateTime

Temporal.Duration

.add()

.subtract()

.until()

.since()

.compare()

.from()

.toString()



DATE

✔ Built into every JavaScript runtime

✔ Great for compatibility

✖ Mutable

✖ One object represents many concepts

✖ Hard timezone calculations

✖ Manual date arithmetic



TEMPORAL

✔ Immutable

✔ Timezone-aware

✔ DST-aware

✔ Nanosecond precision

✔ Easier calculations

✔ Multiple specialized types

✔ Safer API

✔ Better for modern applications

*/
