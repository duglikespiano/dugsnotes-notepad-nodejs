// https://youtu.be/2WJ-ut_XEYQ?si=SE3K290CsVlXv3le&t=1204

// 1. Date Instance
console.log(new Date());

// 2. Create Date
const d1 = new Date(1705320000000);
const d2 = new Date(1705320000000);
console.log(Date.now());
console.log(d1 === d2); // false
console.log(d1.getTime() === d2.getTime()); // true

// 3. Date String
const dateString1 = new Date('2024-01-15');
const dateString2 = new Date('2024-01-15T00:00:00Z');
console.log(dateString1);
console.log(dateString2);

// 4. Year, Month, Day, ... Arguements
const date = new Date(Date.UTC(2024, 0, 15, 0, 0, 0));
console.log(date.toISOString());
