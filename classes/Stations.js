const https = require('https');
const Station = require('./Station');
const Alert = require('./Alert');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type } = require('../config');
const fs = require('fs');
const path = require('path');
const { saveAlertToDb } = require('../commons/dbActions');
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

  fetchStations() {
    return new Promise(async (resolve, reject) => {
      try {
        const jsonData = await this.getStationFromUrl();
        const stations = await Promise.all(jsonData.map(async stationData => {
          if (!stationData.idstazione || !stationData.ordinamento || !stationData.nomestaz || !stationData.lon || !stationData.lat || !stationData.value) {
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

          if (stationData.soglia1 != 0 || stationData.soglia2 != 0 || stationData.soglia3 != 0) {
            let typeOfAlert = undefined;

            if (stationData.value > stationData.soglia3) {
              typeOfAlert = "RED";
            } else if (stationData.value > stationData.soglia2) {
              typeOfAlert = "YELLOW";
            } else if (stationData.value > stationData.soglia1) {
              typeOfAlert = "GREEN";
            }

            if (typeOfAlert != undefined) {
              const data = new Date().toISOString();
              console.log(`ALERT: ${stationData.nomestaz} - ${stationData.value} - ${typeOfAlert}`);
              const newAlert = new Alert(data, stationData.idstazione, stationData.nomestaz, typeOfAlert);
              await saveAlertToDb(newAlert);
            }
          }

          return station.isValid() ? station : null;
        }));

        const validStations = stations.filter(Boolean);
        console.log(`Fetched a total of ${validStations.length} stations at ${new Date().toISOString()}`);
        resolve(validStations);
      } catch (error) {
        reject(error);
      }
    });
  }
}


module.exports = Stations;
