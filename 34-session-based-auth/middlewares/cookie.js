const crypto = require('crypto');
const sessionCookieName = process.env.SESSION_COOKIE_NAME;
const { putSession } = require('../db');

function getCookies(req) {
	const cookiesList = {};
	const cookiesString = req.headers.cookie;

	if (!cookiesString) return cookiesList;

	cookiesString.split(';').forEach((cookieString) => {
		const parts = cookieString.split('=');
		cookiesList[parts[0].trim()] = decodeURIComponent(parts[1]);
	});

	return cookiesList;
}

function validateCookies(req, res) {
	const cookiesList = getCookies(req);
	const doesUserHasCookie = Object.hasOwn(cookiesList, sessionCookieName);

	if (!doesUserHasCookie) {
		const newSessionId = generateSessionId();
		console.log(`newSessionId, ${newSessionId}`);
		putSessionOnDB(newSessionId);
		res.cookie(sessionCookieName, newSessionId, { httpOnly: true });
		return false;
	}
	return true;
}

function putSessionOnDB(newSessionId) {
	putSession(newSessionId);
}

function generateSessionId() {
	return crypto.randomBytes(32).toString('hex');
}

module.exports = { validateCookies, putSessionOnDB };
