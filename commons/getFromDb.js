const { MongoClient } = require('mongodb');

const dbName = 'stream_data'; // Replace with your database name
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL

async function getFromDb(riverName) {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(riverName);

        // Find and return data from the specified collection
        const data = await collection.find({}).toArray();
        return data;
    } catch (err) {
        console.error('Error retrieving data:', err);
        return null;
    } finally {
        client.close();
    }
}

module.exports = getFromDb;
