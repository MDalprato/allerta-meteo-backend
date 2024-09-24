const https = require('https');
const Station = require('./Station');
const Alert = require('./Alert');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type } = require('../config');
const fs = require('fs');
const path = require('path');
const { saveAlertToDb } = require('../commons/dbActions');
const { getWeatherByCoordinates } = require('../apps/weather');
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

      const stations = await Promise.all(jsonData.map(async (stationData) => {
        if (!stationData.idstazione  || !stationData.nomestaz || !stationData.lon || !stationData.lat || !stationData.value) {
          return null;
        }

        const station = new Station(
          stationData.idstazione,
          stationData.nomestaz,
          stationData.lon,
          stationData.soglia1,
          stationData.soglia2,
          stationData.lat,
          stationData.soglia3,
          stationData.value
        );

        this.checkAlerts(station);

        // Recupera i dati meteo
        try {
          const weatherData = await getWeatherByCoordinates(station.lat, station.lon);
          station.humidity = weatherData.main.humidity;
          station.temp = weatherData.main.temp;
          station.pressure = weatherData.main.pressure;
        } catch (error) {
          console.log('Errore durante il recupero delle previsioni:', error);
        }

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

  async checkAlerts(stationData) {

    // Verifica soglie e genera alert se necessario
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
  }



}


module.exports = Stations;
