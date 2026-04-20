const random = require('random').default;

// 1. Basic usage (no seed)
console.log(random.float());
console.log(random.int(1, 10));
console.log(random.boolean());
console.log(random.choice(['apple', 'banana', 'cherry']));

// 2. Using a seed (deterministic randomness)
// Create seeded generator
const rng = random.clone('my-seed');
console.log(rng.int(1, 100));
console.log(rng.int(1, 100)); // same sequence every run

// 3. Shuffle array
const arr = [1, 2, 3, 4, 5];
console.log(random.shuffle(arr));

// 4. Weighted choice
const items = ['common', 'rare', 'epic'];
const weights = [0.7, 0.25, 0.05];
function weightedChoice(items, weights) {
	let rand = random.float();
	for (let i = 0; i < items.length; i++) {
		rand -= weights[i];
		if (rand <= 0) return items[i];
	}
}
console.log(weightedChoice(items, weights));

// 5. Generate random strings
const chars = 'abcdefghijklmnopqrstuvwxyz';
function randomString(length) {
	return Array.from({ length }, () => random.choice([...chars])).join('');
}
console.log(randomString(10));
