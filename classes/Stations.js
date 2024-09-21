const https = require('https');
const Station = require('./Station');
const mongoose = require('mongoose');
const StationModel = require('../Schemas/Station');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type, dbConnection } = require('../config');

class Stations {

  fetchStations() {
    return new Promise((resolve, reject) => {

      const uri = `${get_sensor_values_url}?variabile=${get_sensor_values_type}&time=${getTimestamp()}`;

      https.get(uri, (response) => {
        let data = '';

        response.on('data', (chunk) => data += chunk);
        response.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            const stations = jsonData.map(stationData => {
              const station = new Station(
                stationData.idstazione,
                stationData.ordinamento,
                stationData.nomestaz,
                stationData.lon,
                stationData.soglia1,
                stationData.soglia2,
                stationData.lat,
                stationData.soglia3
              );
              station.addReading(stationData.value);
              return station.isValid() ? station : null;
            }).filter(Boolean);
            console.log(`Fetched a total of ${stations.length} stations at ${new Date().toISOString()}`);
            resolve(stations);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  async addNewReadings(newStationsData) {
    console.log(`Adding new readings at ${new Date().toISOString()}`);
    try {
      await mongoose.connect(dbConnection);

      for (const station of newStationsData) {
        if (!station.readings[0]?.value) continue;

        try {
          const updatedStation = await StationModel.findOneAndUpdate(
            { idstazione: station.idstazione },
            { $push: { readings: { data: new Date(), value: station.readings[0].value } } }
          );
          
        } catch (err) {
          console.log("Cannot update station: ", station.nomestaz, err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async saveStationsToDb(stationsToBeSaved) {
    if (!Array.isArray(stationsToBeSaved) || stationsToBeSaved.length === 0) {
      console.log("Invalid stations to be saved");
      return 'Error';
    }

    try {
      await mongoose.connect(dbConnection);

      const savedStations = await StationModel.insertMany(stationsToBeSaved);
      console.log(`Saved a total of ${savedStations.length} stations at ${new Date().toISOString()}`);
      return savedStations;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = Stations;
