const https = require('https');
const Reading = require('./Reading');
const Alert = require('./Alert');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type } = require('../config');
const fs = require('fs');
const path = require('path');
const { saveAlertToDb } = require('../commons/dbActions');
const { getWeatherByCoordinates } = require('../apps/weather');
require('dotenv').config();
const apiKey = process.env.OPENWEATHER_API;

class Readings {

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

  async fetchReadings() {
    try {
      const jsonData = await this.getReadingFromUrl();

      const readings = await Promise.all(jsonData.map(async (readingData) => {
        if (!readingData.idstazione || !readingData.nomestaz || !readingData.lon || !readingData.lat || !readingData.value) {
          return null;
        }

        const reading = new Reading(
          new Date().toISOString(),
          readingData.idstazione,
          readingData.nomestaz,
          readingData.lon,
          readingData.soglia1,
          readingData.soglia2,
          readingData.lat,
          readingData.soglia3,
          readingData.value
        );

        this.checkAlerts(reading);



        if (apiKey != undefined) {
          // Recupera i dati meteo
          try {
            const weatherData = await getWeatherByCoordinates(reading.lat, reading.lon);
            reading.humidity = weatherData.main.humidity;
            reading.temp = weatherData.main.temp;
            reading.pressure = weatherData.main.pressure;
            reading.rain_1h = weatherData.rain ? weatherData.rain['1h'] : 0;
          } catch (error) {
            console.log('Errore durante il recupero delle previsioni:', error);
          }

        }


        return reading.isValid() ? reading : null;
      }));

      const validReadings = readings.filter(Boolean);
      console.log(`Fetched a total of ${validReadings.length} readings at ${new Date().toISOString()}`);
      return validReadings;
    } catch (error) {
      console.error("Error fetching readings:", error);
      throw error;
    }
  }

  async checkAlerts(readingData) {

    // Verifica soglie e genera alert se necessario
    if (readingData.soglia1 != 0 || readingData.soglia2 != 0 || readingData.soglia3 != 0) {
      let typeOfAlert = undefined;

      if (readingData.value > readingData.soglia3) {
        typeOfAlert = "RED";
      } else if (readingData.value > readingData.soglia2) {
        typeOfAlert = "YELLOW";
      } else if (readingData.value > readingData.soglia1) {
        typeOfAlert = "GREEN";
      }

      if (typeOfAlert != undefined) {
        const data = new Date().toISOString();
        //console.log(`ALERT: ${readingData.nomestaz} - ${readingData.value} - ${typeOfAlert}`);
        const newAlert = new Alert(data, readingData.idstazione, readingData.nomestaz, typeOfAlert);
        await saveAlertToDb(newAlert);
      }
    }
  }



}


module.exports = Readings;
