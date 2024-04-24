const Stations = require("./classes/Stations");
const getFromDb = require("./old_stuff/getFromDb");

const myStations = new Stations();

myStations.getAllStations().then((stations) => {
    console.log(stations);
    myStations.saveStationsToDb();
});


