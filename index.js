const getFromDb = require("./getFromDb");
const getDataFromStream = require("./getStationData");
const stationsData = require('./rivers/rivers.json');
const saveToDb = require("./saveToDb");


function main() {
  
    getFromDb("senio")
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error(error);
    });
}

main()