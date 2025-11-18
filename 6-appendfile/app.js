const fs = require('fs');
const path = require('path');

fs.appendFile(path.join(__dirname, 'text.txt'), '\nThis file has been created by node.js', (err, data) => {
	if (err) throw err;
	console.log('Write complete');
});

// exit on uncaught errors
process.on('uncaughtException', (err) => {
	console.error(`There was an uncaught error: ${err}`);
	process.exit(1);
});
