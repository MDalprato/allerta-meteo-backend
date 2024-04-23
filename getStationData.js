//https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=1699191000000

const https = require('https');
var asciichart = require('asciichart');
const moment = require('moment');

function getTimestamp(){

    var d = new Date
    d.setMilliseconds(0)
    d.setSeconds(0)
    d.setMinutes(d.getMinutes()<31?0:30)
    
    // Tira indietro di 2 ore perché nel db sono UTC
    if (moment(d).isDST())
        d.setHours(d.getHours() - 2); // Solare
    else
        d.setHours(d.getHours() - 1); // Legale

    ts = +d
    return ts; 
};

function getDataFromStream(stationNamesToRetrieve) {
    return new Promise((resolve, reject) => {

        const ts = getTimestamp();

        const uri = `https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=${ts}`

        
        https.get(uri, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                // Parse the JSON response
                const jsonData = JSON.parse(data);
                const results = {};

                // Iterate through the station names to retrieve values
                stationNamesToRetrieve.forEach((stationName) => {
                    const stationData = jsonData.find((station) => station.nomestaz === stationName);

                    if (stationData) {

                        // Remove the properties
                        delete stationData.ordinamento;
                        delete stationData.lon;
                        delete stationData.lat;
                        delete stationData.idstazione;

                        results[stationName] = stationData;



                    } else {
                        console.log(`Station "${stationName}" not found in the data.`);
                    }
                });
                resolve(results);
            });
        }).on('error', (error) => {
            console.error(`Error: ${error.message}`);
            reject(error);
        });
    });
}

module.exports = getDataFromStream;
