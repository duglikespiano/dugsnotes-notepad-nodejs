// https://youtu.be/2WJ-ut_XEYQ?si=qHGY98znBi7gmBya&t=2781

const MS = {
	SECOND: 1_000,
	MINUTE: SECOND * 60,
	HOUR: MINUTE * 60,
	DAY: HOUR * 24,
};

const today = new Date();
const in7Days = new Date(today.getTime() + 7 * MS.DAY);

// Difference between dates
const start = new Date('2024-01-01');
const end = new Date('2024-12-31');
const diffMs = end - start; // 31,449,600,000 ms
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function datsBetween(date1, date2) {
	const MS_PER_DAY = 1000 * 60 * 60 * 24;
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	// Strip time components for accurate day calculation
	d1.setHours(0, 0, 0, 0);
	d2.setHours(0, 0, 0, 0);
	return Math.round(Math.abs(d2 - d1) / MS_PER_DAY);
}
