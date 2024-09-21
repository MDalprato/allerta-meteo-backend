const Stations = require("../classes/Stations");
const myStations = new Stations();

async function updateStations() {
  const stations = await myStations.fetchStations();
  await myStations.saveStationsToDb(stations);
  
  setInterval(async () => {
    const newStations = await myStations.fetchStations();
    await myStations.addNewReadings(newStations);
  }, 5000);
}

updateStations();
