const jwt = require('jsonwebtoken');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

function generateJWT() {
	return jwt.sign({ foo: 'bar' }, 'shhhhh');
}

module.exports = { token, generateJWT };
