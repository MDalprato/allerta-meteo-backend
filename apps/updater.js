const Stations = require("../classes/Stations");
const { saveStationsToDb } = require("../commons/dbActions");

const myStations = new Stations();

function update() {
   myStations.fetchStations().then((stations) => {
    console.log("**** SAVING DATA ****");
    saveStationsToDb(stations);
  });
}

function updateData() {
  setInterval(async () => {
    update();
  }, 60000);
};

async function updateStations() {
  update();
  updateData();
}

updateStations();
