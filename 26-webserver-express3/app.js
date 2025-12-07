const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get(/^\/(index(\.html)?)?$/, (req, res) => {
	console.log('check');
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
