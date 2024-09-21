const https = require('https');
const Station = require('./Station');
const mongoose = require('mongoose');
const StationModel = require('../Schemas/Station');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type, dbConnection } = require('../config');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class Stations {
  getStationFromUrl() {
    return new Promise((resolve, reject) => {
      const isDebug = process.env.DEBUG === 'true';
      const uri = `${get_sensor_values_url}?variabile=${get_sensor_values_type}&time=${getTimestamp()}`;

      if (isDebug) {
        console.log('DEBUG MODE --- DATA LOADED FROM LOCAL FILE !!!! ----');
        const debugFile = fs.readFileSync(path.resolve(process.cwd(), 'http_response_example.json'), 'utf8');
        resolve(JSON.parse(debugFile));
        return;
      }

      https.get(uri, (response) => {
        let data = '';
        response.on('data', (chunk) => data += chunk);
        response.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  async fetchStations() {
    try {
      const jsonData = await this.getStationFromUrl();
      const stations = jsonData.map(stationData => {
        if (!stationData.idstazione || !stationData.ordinamento || !stationData.nomestaz || !stationData.lon || !stationData.lat) {
          return null;
        }
        const station = new Station(
          stationData.idstazione,
          stationData.ordinamento,
          stationData.nomestaz,
          stationData.lon,
          stationData.soglia1,
          stationData.soglia2,
          stationData.lat,
          stationData.soglia3,
          stationData.value
        );
        station.addReading(stationData.value);
        return station.isValid() ? station : null;
      }).filter(Boolean);
      console.log(`Fetched a total of ${stations.length} stations at ${new Date().toISOString()}`);
      return stations;
    } catch (error) {
      throw error;
    }
  }

  async addNewReadings(newStationsData) {
    console.log(`Adding new readings at ${new Date().toISOString()}`);
    try {
      await mongoose.connect(dbConnection);
      for (const element of newStationsData) {
        const station = new Station(
          element.idstazione,
          element.ordinamento,
          element.nomestaz,
          element.lon,
          element.soglia1,
          element.soglia2,
          element.lat,
          element.soglia3,
          element.lastValue
        );
        station.addReading(station.lastValue);
        try {
          await StationModel.findOneAndUpdate(
            { idstazione: station.idstazione },
            { $push: { readings: station.readings } }
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
