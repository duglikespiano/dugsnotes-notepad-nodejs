const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(path.join(__dirname, 'text.txt'), 'utf-8');
		console.log(data);
		//
		await fsPromises.writeFile(path.join(__dirname, 'textMadeByPromise.txt'), `${data} from the new file`);
		await fsPromises.appendFile(path.join(__dirname, 'textMadeByPromise.txt'), '\nThis text is appeneded by node.js');
		await fsPromises.rename(path.join(__dirname, 'textMadeByPromise.txt'), path.join(__dirname, 'renamedTextMadeByPromise.txt'));
		//
		const newData = await fsPromises.readFile(path.join(__dirname, 'renamedTextMadeByPromise.txt'), 'utf-8');
		console.log(newData);
	} catch (err) {
		console.error(err);
	}
};

fileOps();
