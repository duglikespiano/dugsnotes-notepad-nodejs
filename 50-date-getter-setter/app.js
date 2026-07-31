// https://youtu.be/2WJ-ut_XEYQ?si=YntRSHFVr1xGbX_K&t=1814

/**
 * JavaScript Date Instance
 * Getter and Setter Methods
 *
 * Date objects provide getter methods to read date/time values
 * and setter methods to modify date/time values.
 *
 * Getter = "Get" information from a Date object
 * Setter = "Set" or change information inside a Date object
 */

/*
====================================================
1. What are Date Getter Methods?
====================================================

Getter methods allow us to retrieve specific parts of
a Date instance.

Examples:
- Get the year
- Get the month
- Get the day
- Get the hour
- Get the minutes
- Get the seconds

Getter methods do NOT modify the Date object.
They only return information.
*/

const now = new Date();

console.log(now);

/*
Get Full Year
--------------
Returns the year as a four-digit number.

Example:
2026
*/

console.log(now.getFullYear());

/*
Get Month
---------
Returns the month index.

IMPORTANT:
JavaScript months start from 0.

0  = January
1  = February
2  = March
...
11 = December
*/

console.log(now.getMonth());

/*
Get Date
--------
Returns the day of the month.

Range:
1 - 31
*/

console.log(now.getDate());

/*
Get Day
-------
Returns the day of the week.

Range:
0 = Sunday
1 = Monday
2 = Tuesday
...
6 = Saturday
*/

console.log(now.getDay());

/*
Get Hours
----------
Returns the hour.

Range:
0 - 23
*/

console.log(now.getHours());

/*
Get Minutes
-----------
Returns minutes.

Range:
0 - 59
*/

console.log(now.getMinutes());

/*
Get Seconds
------------
Returns seconds.

Range:
0 - 59
*/

console.log(now.getSeconds());

/*
Get Milliseconds
----------------
Returns milliseconds.

Range:
0 - 999
*/

console.log(now.getMilliseconds());

/*
====================================================
2. UTC Getter Methods
====================================================

JavaScript also provides UTC versions of getters.

These methods return time based on UTC
(Coordinated Universal Time), not local timezone.

Examples:

getFullYear()
    -> Local timezone year

getUTCFullYear()
    -> UTC year
*/

console.log(now.getFullYear());

console.log(now.getUTCFullYear());

console.log(now.getHours());

console.log(now.getUTCHours());

/*
====================================================
3. What are Date Setter Methods?
====================================================

Setter methods modify an existing Date instance.

They change values inside the Date object.

Examples:
- Change the year
- Change the month
- Change the day
- Change the time
*/

const birthday = new Date('1995-05-20');

console.log(birthday);

/*
Set Year
--------
Changes the year.
*/

birthday.setFullYear(2000);

console.log(birthday);

/*
Set Month
---------
Changes the month.

Remember:
January = 0
February = 1
March = 2
*/

birthday.setMonth(0);

console.log(birthday);

/*
Set Date
--------
Changes the day of the month.
*/

birthday.setDate(15);

console.log(birthday);

/*
Set Hours
----------
Changes the hour.
*/

birthday.setHours(10);

console.log(birthday);

/*
Set Minutes
------------
Changes minutes.
*/

birthday.setMinutes(30);

console.log(birthday);

/*
Set Seconds
-------------
Changes seconds.
*/

birthday.setSeconds(45);

console.log(birthday);

/*
====================================================
4. UTC Setter Methods
====================================================

Similar to getters, JavaScript provides UTC setters.

Examples:

setFullYear()
    -> Changes local timezone year

setUTCFullYear()
    -> Changes UTC year
*/

const date = new Date();

date.setUTCFullYear(2030);

console.log(date);

/*
====================================================
5. Practical Example
====================================================

Example:
Calculate a date one year from today.
*/

const today = new Date();

console.log('Today:', today);

today.setFullYear(today.getFullYear() + 1);

console.log('One year later:', today);

/*
====================================================
6. Common Getter and Setter Methods Summary
====================================================


GETTERS
--------------------------------

getFullYear()
    Get year

getMonth()
    Get month (0 - 11)

getDate()
    Get day of month (1 - 31)

getDay()
    Get day of week (0 - 6)

getHours()
    Get hour (0 - 23)

getMinutes()
    Get minutes

getSeconds()
    Get seconds

getMilliseconds()
    Get milliseconds


UTC GETTERS
--------------------------------

getUTCFullYear()

getUTCMonth()

getUTCDate()

getUTCDay()

getUTCHours()

getUTCMinutes()

getUTCSeconds()

getUTCMilliseconds()



SETTERS
--------------------------------

setFullYear()

setMonth()

setDate()

setHours()

setMinutes()

setSeconds()

setMilliseconds()


UTC SETTERS
--------------------------------

setUTCFullYear()

setUTCMonth()

setUTCDate()

setUTCHours()

setUTCMinutes()

setUTCSeconds()

setUTCMilliseconds()



====================================================
Key Idea
====================================================

Getter methods:
    Date object --> Information

Setter methods:
    New value --> Date object modification


Example:

const date = new Date();

date.getFullYear();
// Reads the year


date.setFullYear(2030);
// Changes the year


Date objects are mutable because setter methods
modify the original Date instance.
*/
