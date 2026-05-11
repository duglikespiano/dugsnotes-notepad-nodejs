// https://youtu.be/oRekCcwSeXs?si=QtDaCdAzvyfxzOm3

const someComplexValue = (function () {
	const a = 10;
	const b = 20;

	if (a > b) {
		return a * b;
	}

	return b / a;
})();

console.log(someComplexValue); // parenthesis no needed
