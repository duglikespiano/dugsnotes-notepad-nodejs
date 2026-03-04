const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config({ debug: true });
const PORT = process.env.PORT;
const path = require('path');
const { validateCookies, putJWTOnDB } = require('./middlewares/cookie');
const { generateJWT } = require('./session');
const jwtCookieName = process.env.JWT_COOKIE_NAME;

app.use(cookieParser());
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

app.get('/', (req, res) => {
	const isUserLoggedIn = validateCookies(req, res);
	if (isUserLoggedIn) {
		res.sendFile(path.join(__dirname, 'html', 'main.html'));
	} else {
		res.sendFile(path.join(__dirname, 'html', 'login.html'));
	}
});

app.post('/auth', (req, res) => {
	const newJWT = generateJWT();
	putJWTOnDB(newSessionId);
	res.cookie(jwtCookieName, newJWT, { httpOnly: true });
	res.redirect('/');
});

app.delete('/auth', (req, res) => {
	res.clearCookie(jwtCookieName);
	res.redirect('/');
});
