const https = require('https');
var asciichart = require('asciichart');
const Station = require('./Station');
const { getTimestamp } = require('../commons/commons');

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
                    const results = {};


                    if (Array.isArray(jsonData) && jsonData.length > 0) {

                        jsonData.forEach((stationData) => {
                            const currentStation = new Station(stationData.ordinamento, stationData.nomestaz, stationData.lon, stationData.soglia1, stationData.value, stationData.soglia2, stationData.lat, stationData.soglia3);
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

   saveStationsToDb(){
    // saving to DB
   }

   resetStations(){
         this.stations = [];
   }


}

module.exports = Stations;