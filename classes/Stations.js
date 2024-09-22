const https = require('https');
const Station = require('./Station');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type } = require('../config');
const fs = require('fs');
const path = require('path');
const Reading = require('./Reading');
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
        return station.isValid() ? station : null;
      }).filter(Boolean);
      console.log(`Fetched a total of ${stations.length} stations at ${new Date().toISOString()}`);
      return stations;
    } catch (error) {
      throw error;
    }
  }


  async getReadings() {
    try {
      const jsonData = await this.getStationFromUrl();
      const readings = jsonData.map(readingData => {
        if (!readingData.value || !readingData.idstazione || !readingData.nomestaz) {
          return null;
        }
        const data = new Date().toISOString();
        const reading = new Reading(data, readingData.value, readingData.idstazione, readingData.nomestaz);
        return reading.isValid() ? reading : null;
      }).filter(Boolean);
      console.log(`Fetched a total of ${readings.length} readings at ${new Date().toISOString()}`);
      return readings;
    } catch (error) {
      throw error;
    }
  }

}


module.exports = Stations;
