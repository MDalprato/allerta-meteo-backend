//https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=1699191000000

const https = require('https');
var asciichart = require('asciichart');


function getDataFromStream(stationNamesToRetrieve) {
    return new Promise((resolve, reject) => {
        const uri = 'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=1699191000000';

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
