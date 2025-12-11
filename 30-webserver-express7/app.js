const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get(/^\/(index(\.html)?)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

function one(req, res, next) {
	console.log('one');
	next();
}

function two(req, res, next) {
	console.log('two');
	next();
}

function three(req, res) {
	console.log('three');
	res.send('Finished!');
}

app.get(
	/^\/(hello(\.html)?)?$/,
	(req, res, next) => {
		console.log('hello');
		next();
	},
	(req, res) => {
		console.log(req.path);
		res.send('Hello world');
	}
);

app.get(/^\/new-page(\.html)?$/, (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/^\/old-page(\.html)?$/, (req, res) => {
	res.redirect(301, '/new-page.html'); //302 by default
});

app.get(/^\/chain(\.html)?$/, [one, two, three]);

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
