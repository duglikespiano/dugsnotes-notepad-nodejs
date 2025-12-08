const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get(/^\/(index(\.html)?)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/new-page(\.html)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(\.html)?$/, (req, res) => {
	res.redirect(301, '/new-page.html'); //302 by default
});
