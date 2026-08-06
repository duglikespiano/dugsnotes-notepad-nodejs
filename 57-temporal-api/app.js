// https://youtu.be/2WJ-ut_XEYQ?si=shcMgPAaU-rhr3mL&t=7062

/**
 * ==========================================================
 * JavaScript Temporal API
 * ==========================================================
 *
 * Temporal is the modern date/time API for JavaScript.
 *
 * It was created to replace the old Date object because Date
 * has many design problems:
 *
 * - Mutable
 * - Timezone bugs
 * - DST confusion
 * - Difficult date arithmetic
 * - Parsing inconsistencies
 * - UTC vs local time confusion
 *
 * Temporal provides immutable, predictable date/time objects.
 *
 * Think of it like:
 *
 * Date      -> old API
 * Temporal  -> modern replacement
 *
 * ----------------------------------------------------------
 * NOTE
 * ----------------------------------------------------------
 *
 * Temporal is available in modern JavaScript runtimes.
 * Older environments may require the Temporal polyfill.
 *
 */

/*===========================================================
=            Why Date is problematic                        =
===========================================================*/

const date = new Date();

date.setMonth(5); // Mutates original object

console.log(date);

/*
Temporal objects never mutate.

Every operation returns a NEW object.

This makes code much safer.
*/

/*===========================================================
=            Temporal.Now                                   =
===========================================================*/

/*
Get current date/time.
*/

const instant = Temporal.Now.instant();

console.log(instant);

/*
Example:

2026-08-03T05:20:12.123456789Z
*/

/*===========================================================
=            Temporal.Instant                               =
===========================================================*/

/*
Represents an exact moment in time.

Always UTC.

No timezone.
No calendar.
Just a timestamp.
*/

const meeting = Temporal.Instant.from('2026-08-03T12:00:00Z');

console.log(meeting);

/*
Convert to epoch milliseconds.
*/

console.log(meeting.epochMilliseconds);

/*
Convert to epoch nanoseconds.
*/

console.log(meeting.epochNanoseconds);

/*===========================================================
=            Temporal.PlainDate                             =
===========================================================*/

/*
Represents ONLY a calendar date.

No time.
No timezone.
*/

const birthday = Temporal.PlainDate.from('1998-04-18');

console.log(birthday.year);
console.log(birthday.month);
console.log(birthday.day);

/*
Output

1998
4
18
*/

/*===========================================================
=            Temporal.PlainTime                             =
===========================================================*/

/*
Represents ONLY a time.

No date.
No timezone.
*/

const lunch = Temporal.PlainTime.from('12:30:45');

console.log(lunch.hour);
console.log(lunch.minute);
console.log(lunch.second);

/*===========================================================
=            Temporal.PlainDateTime                         =
===========================================================*/

/*
Represents date + time.

No timezone.
*/

const appointment = Temporal.PlainDateTime.from('2026-08-03T14:30');

console.log(appointment);

/*===========================================================
=            Temporal.ZonedDateTime                         =
===========================================================*/

/*
Represents:

Date
Time
Timezone

This is what you usually use for schedules.
*/

const flight = Temporal.ZonedDateTime.from('2026-08-03T09:00:00+09:00[Asia/Seoul]');

console.log(flight.timeZoneId);

/*
Asia/Seoul
*/

console.log(flight.offset);

/*
+09:00
*/

/*===========================================================
=            Temporal.Duration                              =
===========================================================*/

/*
Represents an amount of time.

Like:

5 days
3 hours
10 minutes
*/

const duration = Temporal.Duration.from({
	days: 5,
	hours: 2,
	minutes: 30,
});

console.log(duration);

/*
P5DT2H30M
*/

/*===========================================================
=            Temporal.PlainYearMonth                        =
===========================================================*/

/*
Represents only year + month.
*/

const invoiceMonth = Temporal.PlainYearMonth.from('2026-08');

console.log(invoiceMonth.year);
console.log(invoiceMonth.month);

/*===========================================================
=            Temporal.PlainMonthDay                         =
===========================================================*/

/*
Represents recurring dates.

Examples:

Birthday
Christmas
Anniversary
*/

const christmas = Temporal.PlainMonthDay.from('--12-25');

console.log(christmas.month);
console.log(christmas.day);

/*===========================================================
=            Parsing                                        =
===========================================================*/

const d1 = Temporal.PlainDate.from('2026-08-03');

const d2 = Temporal.PlainDateTime.from('2026-08-03T14:20');

const d3 = Temporal.Instant.from('2026-08-03T05:20:00Z');

const d4 = Temporal.ZonedDateTime.from('2026-08-03T14:20:00+09:00[Asia/Seoul]');

/*===========================================================
=            Formatting                                     =
===========================================================*/

const today = Temporal.PlainDate.from('2026-08-03');

console.log(today.toString());

/*
2026-08-03
*/

/*===========================================================
=            Add                                            =
===========================================================*/

const nextWeek = today.add({
	weeks: 1,
});

console.log(nextWeek);

const nextMonth = today.add({
	months: 1,
});

console.log(nextMonth);

const nextYear = today.add({
	years: 1,
});

console.log(nextYear);

/*===========================================================
=            Subtract                                       =
===========================================================*/

const yesterday = today.subtract({
	days: 1,
});

console.log(yesterday);

/*===========================================================
=            Difference Between Dates                       =
===========================================================*/

const start = Temporal.PlainDate.from('2026-08-01');

const end = Temporal.PlainDate.from('2026-08-10');

const diff = start.until(end);

console.log(diff);

/*
P9D
*/

console.log(diff.days);

/*
9
*/

/*===========================================================
=            Compare                                        =
===========================================================*/

const a = Temporal.PlainDate.from('2026-08-01');

const b = Temporal.PlainDate.from('2026-08-10');

console.log(Temporal.PlainDate.compare(a, b));

/*
-1
*/

console.log(Temporal.PlainDate.compare(b, a));

/*
1
*/

console.log(Temporal.PlainDate.compare(a, a));

/*
0
*/

/*===========================================================
=            Convert Instant to Timezone                    =
===========================================================*/

const utcInstant = Temporal.Instant.from('2026-08-03T03:00:00Z');

const seoulTime = utcInstant.toZonedDateTimeISO('Asia/Seoul');

console.log(seoulTime);

/*
2026-08-03T12:00:00+09:00[Asia/Seoul]
*/

/*===========================================================
=            Day of Week                                    =
===========================================================*/

const sample = Temporal.PlainDate.from('2026-08-03');

console.log(sample.dayOfWeek);

/*
1 = Monday

1 Monday
2 Tuesday
3 Wednesday
4 Thursday
5 Friday
6 Saturday
7 Sunday
*/

console.log(sample.dayOfYear);

console.log(sample.daysInMonth);

console.log(sample.daysInYear);

console.log(sample.inLeapYear);

/*===========================================================
=            Start of Day                                   =
===========================================================*/

/*
Temporal does not have "startOfDay()" like some libraries.

Instead:
*/

const midnight = Temporal.PlainDate.from('2026-08-03').toPlainDateTime(Temporal.PlainTime.from('00:00'));

console.log(midnight);

/*===========================================================
=            Immutable Objects                              =
===========================================================*/

const original = Temporal.PlainDate.from('2026-08-03');

const changed = original.add({
	days: 10,
});

console.log(original);

/*
2026-08-03
*/

console.log(changed);

/*
2026-08-13
*/

/*
Original object never changes.
*/

/*===========================================================
=            Temporal vs Date                               =
===========================================================*/

/*
Date

✓ Built into every JavaScript runtime
✓ Good for simple tasks

✗ Mutable
✗ Timezone confusion
✗ DST issues
✗ Parsing inconsistencies



Temporal

✓ Immutable
✓ Timezone-aware
✓ Calendar-aware
✓ Nanosecond precision
✓ Predictable arithmetic
✓ Better parsing
✓ Easier date calculations
✓ Easier timezone conversions
✓ Easier DST handling



Recommendation:

- Use Date when maintaining legacy code or when targeting environments that don't yet support Temporal.
- Use Temporal for new applications when your runtime supports it (or with the official Temporal polyfill).
*/

/*===========================================================
=            Temporal Object Cheat Sheet                    =
===========================================================*/

/*
Temporal.Now.instant()
    Current UTC timestamp

Temporal.Instant
    Exact moment in time (UTC)

Temporal.PlainDate
    Date only

Temporal.PlainTime
    Time only

Temporal.PlainDateTime
    Date + time (no timezone)

Temporal.ZonedDateTime
    Date + time + timezone

Temporal.Duration
    Length of time

Temporal.PlainYearMonth
    Year + month

Temporal.PlainMonthDay
    Month + day

Common methods

.from()
.toString()
.add()
.subtract()
.until()
.since()
.compare()
.with()
.withCalendar()
.toZonedDateTime()
.toPlainDate()
.toPlainTime()
.toPlainDateTime()
*/
