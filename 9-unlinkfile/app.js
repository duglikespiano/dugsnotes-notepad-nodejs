const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(path.join(__dirname, 'text.txt'), 'utf-8');
		console.log(data);
		//
		await fsPromises.unlink(path.join(__dirname, 'text.txt'));
		await fsPromises.writeFile(path.join(__dirname, 'text.txt'), `${data} from the new file`);
		await fsPromises.appendFile(path.join(__dirname, 'text.txt'), '\nThis text is appeneded by node.js');
		await fsPromises.rename(path.join(__dirname, 'text.txt'), path.join(__dirname, 'textMadeByPromise.txt'));
		//
		const newData = await fsPromises.readFile(path.join(__dirname, 'textMadeByPromise.txt'), 'utf-8');
		console.log(`This is from the new data: ${newData}`);
	} catch (err) {
		console.error(err);
	}
};

fileOps();
