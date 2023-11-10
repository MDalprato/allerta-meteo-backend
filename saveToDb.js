const { MongoClient } = require('mongodb');
const dbName = 'stream_data'; // Replace with your database name
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL

async function saveToDb(riverName, riverData) {


    // Database and collection names

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(riverName);

        // Clone the data and update the timestamp for each insertion
        const entryWithTimestamp = {
            ...riverData,
            timestamp: new Date(),
        };

        // Insert the data entry
        const result = await collection.insertOne(entryWithTimestamp);

    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        client.close();
    }
}

module.exports = saveToDb;
