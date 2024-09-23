const Stations = require("../classes/Stations");
const { saveStationsToDb } = require("../commons/dbActions");

const myStations = new Stations();

function updateData() {
  console.log("**** UPDATING DATA ****");
  setInterval(async () => {
    await myStations.fetchStations().then((stations) => {
      console.log("**** SAVING DATA ****");
      saveStationsToDb(stations);
    });

  }, 2000);
};

async function updateStations() {
  updateData();
}

updateStations();
