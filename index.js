const getDataFromStream = require("./getStationData");
const stationsData = require('./streams/streams.json');


function main() {
    getDataFromStream(stationsData.lamone);
    getDataFromStream(stationsData.senio);

}

main()