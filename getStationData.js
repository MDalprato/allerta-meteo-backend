//https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=1699191000000

const https = require('https');


function getDataFromStream(stationNamesToRetrieve) {

    const uri = 'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time?variabile=254,0,0/1,-,-,-/B13215&time=1699191000000';


    https.get(uri, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // Parse the JSON response
            const jsonData = JSON.parse(data);

            // Iterate through the station names to retrieve values
            stationNamesToRetrieve.forEach(stationName => {
                const stationData = jsonData.find(station => station.nomestaz === stationName);

                if (stationData) {
                    // Extract the "value" property from the station data
                    const value = stationData.value;
                    console.log(`Value for station ${stationName}: ${value}`);
                } else {
                    console.log(`Station "${stationName}" not found in the data.`);
                }
            });
        });
    }).on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

}


module.exports = getDataFromStream;
