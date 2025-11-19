const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'text.txt'), 'This file has been created by node.js', (err, data) => {
	if (err) throw err;
	console.log('Write complete');

	fs.appendFile(path.join(__dirname, 'text.txt'), '\nThis line is appended after writing the file', (err) => {
		if (err) throw err;
		console.log('Append complete');

		fs.rename(path.join(__dirname, 'text.txt'), path.join(__dirname, 'renamed.txt'), (err) => {
			if (err) throw err;
			console.log('Rename complete');
		});
	});
});

// exit on uncaught errors
process.on('uncaughtException', (err) => {
	console.error(`There was an uncaught error: ${err}`);
	process.exit(1);
});
