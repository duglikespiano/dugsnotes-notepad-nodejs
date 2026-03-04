const { MongoClient } = require('mongodb');

// Replace the placeholder with your Atlas connection string
const URL = process.env.DB_URL;
const databaseName = process.env.DB_NAME;
const databaseCollectionName = process.env.DB_COLLECTION_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URL);

async function putJWT(newSessionId) {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();

		// Send a ping to confirm a successful connection
		const database = client.db(databaseName);
		const collection = database.collection(databaseCollectionName);

		const query = { user: 'dug' };
		const update = { $set: { user: 'dug', sessionId: newSessionId } };
		const options = {};
		const result = await collection.updateOne(query, update, options);

		// const data = collection.find();

		// for await (const doc of data) {
		// 	 console.log(doc);
		// }

		// console.log('Pinged your deployment. You successfully connected to MongoDB!');
		console.log(result);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

module.exports = { putJWT };
