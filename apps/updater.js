const Stations = require("../classes/Stations");
const { saveStationsToDb, saveReadingsToDb } = require("../commons/dbActions");


const myStations = new Stations();

async function updateStations() {
  const stations = await myStations.fetchStations();
  await saveStationsToDb(stations);

  setInterval(async () => {
    const readings = await myStations.getReadings();
    await saveReadingsToDb(readings);
  }, 2000);
}

updateStations();
