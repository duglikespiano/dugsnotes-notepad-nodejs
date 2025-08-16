const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const port = 8080;

app.use(express.json());

app.post('/googlesheet', (req, res) => {
	const data = req.body;
	console.log('Sheet updated:', data);
	// data looks like: { sheet: 'Sheet1', range: 'A1', value: 'Hello', timestamp: '...' }

	// You can handle changes here: update DB, trigger workflow, etc.
	res.sendStatus(200);
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
