const generateChart = require("./generateChart");
const getDataFromStream = require("./getStationData");
const stationsData = require('./rivers/rivers.json');
const saveToDb = require("./saveToDb");

function runtimeGetAndSaveRiverData(riverName) {

    console.log("*****")
    console.error("Chart for river ", riverName);

    getDataFromStream(stationsData[riverName])
        .then((data) => {
            saveToDb(riverName, data)
            generateChart(data);
        })
        .catch((error) => {
            console.error(error);
        });



}

runtimeGetAndSaveRiverData("senio");

// // Schedule the function to run every 10 minutes (10 * 60 * 1000 milliseconds)
// //const intervalInMilliseconds = 10 * 60 * 1000;
// const intervalInMilliseconds = 5 * 1000;

// setInterval(runtimeGetAndSaveRiverData, intervalInMilliseconds);