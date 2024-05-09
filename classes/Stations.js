const https = require('https');
const Station = require('./Station');
const mongoose = require('mongoose');
const StationModel = require('../Schemas/Station');
const { getTimestamp } = require('../commons/commons');
const { get_sensor_values_url, get_sensor_values_type, dbConnection } = require('../config');


class Stations {

  fetchStations() {

    return new Promise((resolve, reject) => {

      const ts = getTimestamp();
      const type = '254,0,0/1,-,-,-/B13215'
      const stations = [];

      const uri = get_sensor_values_url + `?variabile=${get_sensor_values_type}&time=${ts}`;

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

              const currentStation = new Station(
                stationData.idstazione,
                stationData.ordinamento,
                stationData.nomestaz,
                stationData.lon,
                stationData.soglia1,
                stationData.soglia2,
                stationData.lat,
                stationData.soglia3);

              currentStation.addReading(stationData.value);
              currentStation.isValid() && stations.push(currentStation);
            });

          }
          resolve(stations);
        });

      }).on('error', (error) => {
        console.error(`Error: ${error.message}`);
        reject(error);
      });
    });

  }

  async addNewReadings(newStationsData) {
    // connecting to mongo
    mongoose
      .connect(dbConnection)
      .then(() => console.log("MongoDB successfully connected"))
      .catch((err) => console.log(err, 'server', err));

    // loop di tutte le stazioni
    for (let i = 0; i < newStationsData.length; i++) {
      const station = newStationsData[i];
      if(station.readings[0].value == null || station.readings[0].value == undefined) {
        return;
      }
      StationModel.findOneAndUpdate(
        { idstazione: station.idstazione },
        { $push: { 
          readings: { 
            data: new Date(), 
            value: station.readings[0].value
          } 
        } 
      },
      ).then(station => {
        console.log("Updated station: ", station.nomestaz);
      })
      .catch(err => {
        console.log("cannot update station:  ", station.nomestaz);
        console.log(err)
      });

    }

  }

  async saveStationsToDb(stationsToBeSaved) {

    //controllo di validita su stationsToBeSaved

    if(!Array.isArray(stationsToBeSaved) && stationsToBeSaved.length === 0) {
      console.log("Invalid stations to be saved");
      return;
    }

    return new Promise((resolve, reject) => {

     
      // connecting to mongo
      mongoose
        .connect(dbConnection)
        .then(() => console.log("MongoDB successfully connected"))
        .catch((err) => console.log(err, 'server', err));

      try {
        StationModel
          .insertMany(stationsToBeSaved)
          .then(stations => {
            resolve(stations);
          })
          .catch(err => {
            console.log(err)
            reject(err);
          });

      } catch (error) {
        console.log(error)
        reject(error);
      }

    });

  }


}

module.exports = Stations;