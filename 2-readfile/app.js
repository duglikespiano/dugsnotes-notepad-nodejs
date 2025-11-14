const fs = require('fs');

// fs.readFile('./text.txt', (err, data) => {
// 	if (err) throw err;
// 	print buffer data
// 	console.log(data);
// 	print actual string data
// 	console.log(data.toString());
// });

// or encoding parameter can be passed for second arguement like 'utf8'

fs.readFile('./text.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	console.log(data);
});
