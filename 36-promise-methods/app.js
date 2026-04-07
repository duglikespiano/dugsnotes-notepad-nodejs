// https://youtu.be/0yR_Im3VPqQ?si=auAkWJHa6gq1rO31

function getName() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// resolve('dug');
			reject(new Error('NO NAME'));
		}, 1000);
	});
}

function getTodo() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('to eat');
			//reject(new Error('NO TODO'));
		}, 2000);
	});
}

// Promise.all
// The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.all([getName(), getTodo()])
// 	.then((data) => {
// 		console.log('Data from Promise.all');
// 		console.log(data);
// 		console.log('------------------------');
// 	})
// 	.catch((err) => console.log(err));

// Promise.allSettled
// The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
// Promise.allSettled([getName(), getTodo()])
// 	.then((data) => {
// 		console.log('Data from Promise.allSettled');
// 		console.log(data);
// 		console.log('------------------------');
// 	})
// 	.catch((err) => console.log(err));

// Promise.any
// The Promise.any() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
// Promise.any([getName(), getTodo()])
// 	.then((data) => {
// 		console.log('Data from Promise.any');
// 		console.log(data);
// 		console.log('------------------------');
// 	})
// 	.catch((err) => console.log(err));

// Promise.race
// The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
Promise.race([getName(), getTodo()])
	.then((data) => {
		console.log('Data from Promise.race');
		console.log(data);
		console.log('------------------------');
	})
	.catch((err) => console.log(err));
