// https://youtu.be/2WJ-ut_XEYQ?si=xhsSyFhq5l85toGT&t=795

/**
 * ==========================================================
 * Why Store Timestamps in UTC?
 * ==========================================================
 *
 * UTC (Coordinated Universal Time) is the world's standard
 * time reference. Unlike local time zones, UTC never changes
 * because of Daylight Saving Time (DST).
 *
 * ----------------------------------------------------------
 * Why should databases store timestamps in UTC?
 * ----------------------------------------------------------
 *
 * 1. Consistency
 * ----------------------------------------------------------
 * Every server, application, and user stores the exact same
 * moment in time.
 *
 * Example:
 *
 * User A (Tokyo):      2026-07-28 18:00 JST
 * User B (New York):   2026-07-28 05:00 EDT
 *
 * Both represent the same moment.
 *
 * Database stores:
 * 2026-07-28T09:00:00Z
 *
 * Everyone refers to the same timestamp.
 *
 *
 * 2. Avoid Time Zone Confusion
 * ----------------------------------------------------------
 * Imagine your application has users from:
 *
 * - Japan
 * - Korea
 * - USA
 * - Germany
 * - Australia
 *
 * If everyone saved their local time:
 *
 * 9:00
 * 10:00
 * 15:00
 * 23:00
 *
 * Which one is correct?
 *
 * Without the time zone information, you don't know.
 *
 * UTC removes this ambiguity.
 *
 *
 * 3. Daylight Saving Time (DST)
 * ----------------------------------------------------------
 * Some countries change their clocks every year.
 *
 * Example:
 *
 * Before DST:
 * 08:00
 *
 * After DST:
 * 09:00
 *
 * UTC never changes, making calculations much easier.
 *
 *
 * 4. Easier Sorting
 * ----------------------------------------------------------
 * UTC timestamps can be sorted directly.
 *
 * Example:
 *
 * 2026-07-28T08:30:00Z
 * 2026-07-28T09:00:00Z
 * 2026-07-28T09:30:00Z
 *
 * The order is always correct worldwide.
 *
 *
 * 5. Easier Calculations
 * ----------------------------------------------------------
 * Calculating durations becomes straightforward.
 *
 * Example:
 *
 * Login:
 * 2026-07-28T09:00:00Z
 *
 * Logout:
 * 2026-07-28T10:30:00Z
 *
 * Duration:
 * 1 hour 30 minutes
 *
 * No need to worry about different time zones.
 *
 *
 * 6. Convert Only When Displaying
 * ----------------------------------------------------------
 * Store UTC in the database.
 *
 * Convert to the user's local time only when displaying it.
 *
 * Database:
 * 2026-07-28T09:00:00Z
 *
 * Display in Japan:
 * 2026-07-28 18:00 JST
 *
 * Display in Korea:
 * 2026-07-28 18:00 KST
 *
 * Display in California (summer):
 * 2026-07-28 02:00 PDT
 *
 * The stored value never changes—only the display changes.
 *
 *
 * ==========================================================
 * JavaScript Example
 * ==========================================================
 */

// Current time (internally represented as a UTC-based instant)
const now = new Date();

// Convert to an ISO 8601 UTC string (recommended for APIs and databases)
const utcTimestamp = now.toISOString();

console.log(utcTimestamp);
// Example:
// 2026-07-28T09:15:32.456Z

/**
 * The "Z" means Zulu Time, which is another name for UTC.
 */

/**
 * ==========================================================
 * Reading UTC from a Database
 * ==========================================================
 */

const dbTimestamp = '2026-07-28T09:00:00Z';

const date = new Date(dbTimestamp);

// Display using the user's local time zone
console.log(date.toString());

// Or display using a specific time zone
console.log(
	date.toLocaleString('en-US', {
		timeZone: 'Asia/Tokyo',
	}),
);

console.log(
	date.toLocaleString('en-US', {
		timeZone: 'America/Los_Angeles',
	}),
);

/**
 * ==========================================================
 * Best Practice
 * ==========================================================
 *
 * ✔ Store timestamps in UTC.
 * ✔ Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
 * ✔ Convert to the user's local time only when displaying.
 * ✔ Never store ambiguous local times unless you also store
 *   the associated time zone or offset.
 *
 * Database:
 * -------------------------------
 * created_at
 * updated_at
 * deleted_at
 * login_at
 * last_seen_at
 * expires_at
 *
 * Example values:
 *
 * 2026-07-28T09:00:00Z
 * 2026-07-28T12:45:10Z
 * 2026-07-29T01:30:20Z
 *
 * This approach keeps your application consistent across
 * different countries, servers, and time zones.
 */
