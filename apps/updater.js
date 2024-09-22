const Stations = require("../classes/Stations");
const { saveStationsToDb, saveReadingsToDb } = require("../commons/dbActions");

const myStations = new Stations();

function updateData() {
  console.log("**** UPDATING DATA ****");
  setInterval(async () => {
    const readings = await myStations.getReadings();
    await saveReadingsToDb(readings);
  }, 2000);
};

async function updateStations() {
  const stations = await myStations.fetchStations();
  await saveStationsToDb(stations);

  updateData();

}

updateStations();
