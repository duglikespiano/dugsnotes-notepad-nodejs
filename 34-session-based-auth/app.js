const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config({ debug: true });
const PORT = process.env.PORT;
const path = require('path');
const { generateSessionId, sessionId } = require('./session');
const { validateCookies, putSessionOnDB } = require('./middlewares/cookie');
const sessionCookieName = process.env.SESSION_COOKIE_NAME;

console.log(sessionId);
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
	const newSessionId = generateSessionId();
	console.log(`newSessionId, ${newSessionId}`);
	putSessionOnDB(newSessionId);
	res.cookie(sessionCookieName, newSessionId, { httpOnly: true });
	res.redirect('/');
});

app.delete('/auth', (req, res) => {
	res.clearCookie(sessionCookieName);
	res.redirect('/');
});
