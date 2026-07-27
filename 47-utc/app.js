// https://youtu.be/2WJ-ut_XEYQ?si=Q2cV6_GecLLamTna&t=695

/**
 * ============================================================
 * UTC (Coordinated Universal Time) vs GMT (Greenwich Mean Time)
 * ============================================================
 *
 * Definition
 * ----------
 * UTC (Coordinated Universal Time) is the modern international
 * time standard used around the world. It is maintained using
 * highly accurate atomic clocks.
 *
 * GMT (Greenwich Mean Time) is a historical time standard based
 * on the mean solar time at Greenwich, England.
 *
 * Although UTC and GMT are defined differently, they both
 * represent the same time offset (UTC+0) in everyday use.
 *
 * ------------------------------------------------------------
 * UTC vs GMT
 * ------------------------------------------------------------
 *
 * UTC
 * - Modern international time standard.
 * - Maintained using atomic clocks.
 * - Used in programming, aviation, GPS, and the Internet.
 * - Never changes throughout the year.
 *
 * GMT
 * - Historical time standard based on Earth's rotation.
 * - Often used as a time zone name.
 * - Also represents UTC+0.
 * - The UK uses GMT only during winter.
 *
 * ------------------------------------------------------------
 * UTC vs GMT Comparison
 * ------------------------------------------------------------
 *
 * +----------------------+-------------------------------+----------------------------+
 * | UTC                  | GMT                           |
 * +----------------------+-------------------------------+----------------------------+
 * | Time standard        | Time zone / historical standard|
 * | Atomic clocks        | Mean solar time               |
 * | Used in programming  | Used for civil time           |
 * | Never changes        | UTC+0 (winter in UK)          |
 * +----------------------+-------------------------------+----------------------------+
 *
 * ------------------------------------------------------------
 * Why programmers use UTC
 * ------------------------------------------------------------
 *
 * UTC is the official international time standard used in:
 * - JavaScript
 * - Python
 * - Databases
 * - APIs
 * - Servers
 * - Cloud services
 * - GPS
 *
 * Storing timestamps in UTC prevents problems caused by
 * different local time zones and daylight saving time (DST).
 *
 * ------------------------------------------------------------
 * JavaScript Example
 * ------------------------------------------------------------
 */

const now = new Date();

console.log('Local Time:');
console.log(now.toString());

console.log('\nUTC Time:');
console.log(now.toUTCString());

console.log('\nISO String (UTC):');
console.log(now.toISOString());

/*
Example Output

Local Time:
Sun Jul 26 2026 18:45:30 GMT+0900 (Japan Standard Time)

UTC Time:
Sun, 26 Jul 2026 09:45:30 GMT

ISO String (UTC):
2026-07-26T09:45:30.000Z

Notice:
The method is called "toUTCString()", but the output contains
"GMT". This is intentional.

Historically, Internet standards (HTTP, RFC 7231, RFC 5322, etc.)
represent UTC dates using the label "GMT" for compatibility.

Therefore:

toUTCString()
↓
Sun, 26 Jul 2026 09:45:30 GMT

The displayed "GMT" actually represents UTC.
*/

/*
 * ------------------------------------------------------------
 * UTC Offset
 * ------------------------------------------------------------
 *
 * UTC always has an offset of:
 *
 * UTC+0
 *
 * Example:
 *
 * UTC      12:00
 * GMT      12:00
 *
 * They display the same clock time.
 */

/*
 * ------------------------------------------------------------
 * GMT and the United Kingdom
 * ------------------------------------------------------------
 *
 * The UK changes its local time depending on the season.
 *
 * Winter:
 * GMT (UTC+0)
 *
 * Summer:
 * BST (British Summer Time)
 * UTC+1
 *
 * Example
 *
 * January
 * UTC: 12:00
 * London: 12:00 (GMT)
 *
 * July
 * UTC: 12:00
 * London: 13:00 (BST)
 *
 * UTC never changes.
 * London's local time changes because of daylight saving time.
 */

/*
 * ------------------------------------------------------------
 * Key Takeaways
 * ------------------------------------------------------------
 *
 * ✔ UTC is the modern international time standard.
 *
 * ✔ GMT is the historical time standard based on Greenwich.
 *
 * ✔ UTC and GMT both represent UTC+0 in everyday use.
 *
 * ✔ JavaScript uses UTC internally for many operations.
 *
 * ✔ toUTCString() displays "GMT" for historical compatibility.
 *
 * ✔ UTC never changes because of daylight saving time.
 *
 * ✔ Many applications store timestamps in UTC and convert
 *   them to the user's local time only when displaying them.
 */
