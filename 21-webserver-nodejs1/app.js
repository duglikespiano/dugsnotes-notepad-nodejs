const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
