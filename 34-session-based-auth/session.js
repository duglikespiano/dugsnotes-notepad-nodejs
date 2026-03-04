const crypto = require('crypto');

const sessions = {
	userId: 1,
	username: 'dug',
	expires: 1710000000000,
};

function generateSessionId() {
	return crypto.randomBytes(32).toString('hex');
}

const sessionId = generateSessionId();

module.exports = { generateSessionId, sessionId };
