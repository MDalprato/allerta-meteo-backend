const getDataFromStream = require("./getStationData");
const stationsData = require('./rivers/rivers.json');
const saveToDb = require("./saveToDb");

function runtimeGetAndSaveRiverData() {
    // saving senio data
    getDataFromStream(stationsData.senio)
        .then((data) => {
            saveToDb("senio", data)
            console.log("Saved data for senio")
        })
        .catch((error) => {
            console.error(error);
        });
        
}

// Schedule the function to run every 10 minutes (10 * 60 * 1000 milliseconds)
//const intervalInMilliseconds = 10 * 60 * 1000;
const intervalInMilliseconds = 5 * 1000;

setInterval(runtimeGetAndSaveRiverData, intervalInMilliseconds);