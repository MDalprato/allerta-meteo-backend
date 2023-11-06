const { MongoClient } = require('mongodb');
const Arima = require('arima');

// MongoDB connection URL and data retrieval
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const dbName = 'stream_data'; // Replace with your database name
const collectionName = 'stream_data'; // Replace with your collection name
const client = new MongoClient(url);

async function retrieveData() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Retrieve historical water level data from MongoDB
    const data = await collection.find().toArray();

    // Preprocess data and split into training and validation/test sets

    // Train the ARIMA model
    const arimaModel = new Arima(data, { p: 1, d: 1, q: 1 });

    // Make predictions
    const predictions = arimaModel.predictNext(7); // Adjust the number of future predictions as needed

    console.log('Predicted water levels:', predictions);
  } catch (err) {
    console.error('Error retrieving data:', err);
  } finally {
    client.close();
  }
}

// Call the retrieveData function to start the process
retrieveData();