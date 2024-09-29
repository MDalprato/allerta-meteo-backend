const https = require('https');
const Station = require('./Station');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type } = require('../config');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

class Stations {

  getReadingFromUrl() {
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
      const jsonData = await this.getReadingFromUrl();

      const stations = await Promise.all(jsonData.map(async (stationData) => {
        if (!stationData.idstazione  || !stationData.nomestaz || !stationData.lon || !stationData.lat) {
          return null;
        }

        const station = new Station(
          stationData.idstazione,
          stationData.nomestaz,
          stationData.lon,
          stationData.lat,
       
        );

        console.log(`Fetched station: ${station.name}`);

        return station.isValid() ? station : null;
      }));

      const validStations = stations.filter(Boolean);
      console.log(`Fetched a total of ${validStations.length} stations at ${new Date().toISOString()}`);
      return validStations;
    } catch (error) {
      console.error("Error fetching stations:", error);
      throw error;
    }
  }

}


module.exports = Stations;
