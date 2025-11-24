const fsPromise = require('fs').promises;

async function main() {
	try {
		if (!(await exists('./new'))) {
			await fsPromise.mkdir('./new');
			console.log('Directory created');
		}

		if (await exists('./new')) {
			await fsPromise.rmdir('./new');
			console.log('Directory removed');
		}
	} catch (err) {
		console.error(err);
	}
}

async function exists(path) {
	try {
		await fsPromise.stat(path);
		return true;
	} catch (e) {
		return false;
	}
}

main();
