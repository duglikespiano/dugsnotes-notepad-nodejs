const jwt = require('jsonwebtoken');
const jwtCookieName = process.env.JWT_COOKIE_NAME;
const { putJWT } = require('../db');

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
	const doesUserHasCookie = Object.hasOwn(cookiesList, jwtCookieName);

	if (!doesUserHasCookie) {
		const newJWT = generateJWT();
		console.log(`newJWT, ${newJWT}`);
		putJWTOnDB(newJWT);
		res.cookie(jwtCookieName, newJWT, { httpOnly: true });
		return false;
	}
	return true;
}

function putJWTOnDB(newJWT) {
	putJWT(newJWT);
}

function generateJWT() {
	const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
	return token;
}

module.exports = { validateCookies, putJWTOnDB };
