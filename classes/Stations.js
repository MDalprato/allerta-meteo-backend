const https = require('https');
const Station = require('./Station');
const { getTimestamp } = require('../commons/commons');
const { MongoClient } = require('mongodb');

class Stations {

    constructor() {
        this.stations = [];
    }


    getAllStations() {

        return new Promise((resolve, reject) => {

            const ts = getTimestamp();
            const type = '254,0,0/1,-,-,-/B13215'
            const uri = `https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=${type}&time=${ts}`


            https.get(uri, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    // Parse the JSON response
                    const jsonData = JSON.parse(data);

                    if (Array.isArray(jsonData) && jsonData.length > 0) {

                        jsonData.forEach((stationData) => {
                            const currentStation = new Station(stationData.idstazione, stationData.ordinamento, stationData.nomestaz, stationData.lon, stationData.soglia1, stationData.value, stationData.soglia2, stationData.lat, stationData.soglia3);
                            this.stations.push(currentStation);

                        });

                    }
                    resolve(this.stations);
                });

            }).on('error', (error) => {
                console.error(`Error: ${error.message}`);
                reject(error);
            });
        });

    }


    getStationsAsJson() {
       
        const stationsJson = [];

        this.stations.forEach((station) => {
            stationsJson.push(station.getObject());
        });

        return stationsJson;

    }
    
    async saveStationsToDb() {
        // Import the MongoDB Node.js driver

        // Connection URI
        const url = 'mongodb://localhost:27017/';

        // Database name
        const dbName = 'allerta-meteo';

        // Create a new MongoClient

        const client = new MongoClient(url);

        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('test');
            
         

            // Find and return data from the specified collection
            collection.insertMany(this.getStationsAsJson(), function (err, res) {
                if (err) {
                    console.error(`Error inserting documents: ${err.message}`);
                    throw err;
                }
                console.log("1 document inserted");
            });

        } catch (err) {
            console.error('Error retrieving data:', err);
            return null;
        } 

        

    }


    cleanStations() {
        this.stations = [];
    }


}

module.exports = Stations;