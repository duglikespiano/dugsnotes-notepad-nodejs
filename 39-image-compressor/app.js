const fs = require('fs').promises;
const path = require('node:path');
const sharp = require('sharp');

async function getFiles(dir) {
	try {
		// Returns an array of file names (strings)
		const files = await fs.readdir(dir);
		return files;
	} catch (err) {
		console.error('Error reading directory:', err);
	}
}

async function processImage(filenamesArray) {
	for (const [index, value] of filenamesArray.entries()) {
		// console.log(index, value);
		const image = sharp(path.join(`${__dirname}`, 'src', value));
		image.metadata().then(function (metadata) {
			return image
				.jpeg({
					quality: 80,
				})
				.resize(Math.round(metadata.width / 3))
				.withMetadata() // keep orientation
				.toFile(path.join(__dirname, 'output', `${value.split('.')[0]}.jpg`), function (err) {});
		});
	}
}

(async () => {
	const files = await getFiles(path.join(__dirname, 'src'));
	await processImage(files);
})();
