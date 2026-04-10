const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const fetch = require('node-fetch');

const server = http.createServer(app);
const port = 8080;

app.use(express.json());

app.get('/images', async (req, res) => {
	const response = await fetch('https://picsum.photos/v2/list');
	const data = await response.json();

	const downloadDir = path.join(__dirname, 'downloads');
	if (!fs.existsSync(downloadDir)) {
		fs.mkdirSync(downloadDir);
	}

	const downloads = data.map(async (d) => {
		const imgResponse = await fetch(d.download_url);
		const buffer = await imgResponse.buffer();
		const filename = path.join(downloadDir, `${parseInt(d.id) + 1}.jpg`);
		fs.writeFileSync(filename, buffer);
		return filename;
	});

	const files = await Promise.all(downloads);
	res.json({ downloaded: files.length, files });
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
