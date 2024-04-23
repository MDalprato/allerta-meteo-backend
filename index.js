const Stations = require("./classes/Stations");

const myStations = new Stations();

myStations.getAllStations().then((stations) => {
    console.log(stations);
});
