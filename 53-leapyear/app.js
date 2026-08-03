// https://youtu.be/2WJ-ut_XEYQ?si=-9IWRjx7bk4KDL2_&t=3056

/**
 * ============================================================
 * JavaScript Notes - Working with Leap Years
 * ============================================================
 *
 * What is a Leap Year?
 * --------------------
 * A leap year contains 366 days instead of 365.
 *
 * February normally has 28 days.
 * During a leap year, February has 29 days.
 *
 * Why do leap years exist?
 * ------------------------
 * The Earth takes approximately 365.2422 days to orbit the Sun.
 * Since a normal calendar only has 365 days, we occasionally add
 * one extra day to keep the calendar synchronized with Earth's orbit.
 */

/*==============================================================
1. Leap Year Rules
==============================================================*/

/*
A year is a leap year if:

1. It is divisible by 4
AND

2. It is NOT divisible by 100

EXCEPT

3. If it is divisible by 400, it IS a leap year.

Examples:

1996 -> Leap Year
2000 -> Leap Year
1900 -> Not Leap Year
2024 -> Leap Year
2025 -> Not Leap Year
2100 -> Not Leap Year
2400 -> Leap Year
*/

/*==============================================================
2. Checking if a Year is a Leap Year
==============================================================*/

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2025)); // false
console.log(isLeapYear(1900)); // false
console.log(isLeapYear(2000)); // true

/*==============================================================
3. Understanding the Logic
==============================================================*/

/*
2024

2024 % 4 === 0      -> true
2024 % 100 !== 0    -> true

Result:
true && true
=> true

--------------------

1900

1900 % 4 === 0      -> true
1900 % 100 !== 0    -> false
1900 % 400 === 0    -> false

Result:
(true && false) || false
=> false

--------------------

2000

2000 % 4 === 0      -> true
2000 % 100 !== 0    -> false
2000 % 400 === 0    -> true

Result:
(true && false) || true
=> true
*/

/*==============================================================
4. Using Date to Detect a Leap Year
==============================================================*/

/*
A neat trick is to ask JavaScript how many days are in February.

new Date(year, 2, 0)

month = 2 means March
day = 0 means "the day before March"

The result is the last day of February.
*/

function isLeapYearUsingDate(year) {
	return new Date(year, 2, 0).getDate() === 29;
}

console.log(isLeapYearUsingDate(2024)); // true
console.log(isLeapYearUsingDate(2025)); // false

/*==============================================================
5. Number of Days in a Year
==============================================================*/

function daysInYear(year) {
	return isLeapYear(year) ? 366 : 365;
}

console.log(daysInYear(2024)); // 366
console.log(daysInYear(2025)); // 365

/*==============================================================
6. Number of Days in a Month
==============================================================*/

/*
JavaScript Date makes this easy.

new Date(year, month + 1, 0)

month is zero-based.

0 = January
1 = February
2 = March
...

Day 0 means "one day before the first day of the next month."
*/

function daysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

console.log(daysInMonth(2024, 1)); // 29 (February)
console.log(daysInMonth(2025, 1)); // 28
console.log(daysInMonth(2024, 0)); // 31 (January)
console.log(daysInMonth(2024, 3)); // 30 (April)

/*==============================================================
7. Validating February 29
==============================================================*/

function isValidFeb29(year) {
	return isLeapYear(year);
}

console.log(isValidFeb29(2024)); // true
console.log(isValidFeb29(2025)); // false

/*==============================================================
8. Adding One Year Carefully
==============================================================*/

/*
A common bug occurs when adding one year to February 29.

Example:
*/

const leapDay = new Date(2024, 1, 29);

const nextYear = new Date(leapDay);
nextYear.setFullYear(nextYear.getFullYear() + 1);

console.log(leapDay.toDateString());
// Thu Feb 29 2024

console.log(nextYear.toDateString());
// Sat Mar 01 2025

/*
Why?

2025 does not have February 29.

JavaScript automatically rolls the invalid date forward
to March 1.
*/

/*==============================================================
9. Keeping February 28 Instead
==============================================================*/

/*
Sometimes you want Feb 29 -> Feb 28
instead of Mar 1.
*/

function addOneYearSafely(date) {
	const copy = new Date(date);

	const month = copy.getMonth();
	const day = copy.getDate();

	copy.setFullYear(copy.getFullYear() + 1);

	// If Feb 29 became March 1,
	// move it back to Feb 28.
	if (month === 1 && day === 29 && copy.getMonth() === 2) {
		copy.setMonth(1);
		copy.setDate(28);
	}

	return copy;
}

const safeDate = addOneYearSafely(new Date(2024, 1, 29));

console.log(safeDate.toDateString());
// Fri Feb 28 2025

/*==============================================================
10. Finding the Next Leap Year
==============================================================*/

function nextLeapYear(year) {
	let y = year + 1;

	while (!isLeapYear(y)) {
		y++;
	}

	return y;
}

console.log(nextLeapYear(2025)); // 2028
console.log(nextLeapYear(2028)); // 2032

/*==============================================================
11. Finding the Previous Leap Year
==============================================================*/

function previousLeapYear(year) {
	let y = year - 1;

	while (!isLeapYear(y)) {
		y--;
	}

	return y;
}

console.log(previousLeapYear(2025)); // 2024
console.log(previousLeapYear(2024)); // 2020

/*==============================================================
12. Real-World Tips
==============================================================*/

/*
✓ Never assume every year has 365 days.

✓ Never assume February always has 28 days.

✓ Use Date instead of hardcoding month lengths whenever possible.

✓ When adding years, remember that Feb 29 may become Mar 1.

✓ When validating dates entered by users, check whether
  February 29 is valid for that year.

✓ JavaScript's Date object already understands leap years,
  so prefer using Date methods rather than manually storing
  month lengths.
*/

/*==============================================================
13. Summary
==============================================================*/

/*
Leap Year Rules

Divisible by 4
        ↓
      Yes?
        ↓
Divisible by 100?
        ↓
       No
        ↓
 Leap Year

If divisible by 100:
        ↓
Divisible by 400?
        ↓
      Yes
        ↓
 Leap Year

Otherwise:
Not a Leap Year


Examples

2024 -> Leap Year
2025 -> Not Leap Year
1900 -> Not Leap Year
2000 -> Leap Year
2100 -> Not Leap Year
2400 -> Leap Year
*/
