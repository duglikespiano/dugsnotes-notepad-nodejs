const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// app.use and app.all can be used in very similar way
// app.use is more like middleware -> regex is not acceptable
// app.all is more like router -> regex is acceptable

// app.use((req, res, next) => {
// 	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

app.all(/.*/, (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
