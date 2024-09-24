const Stations = require("../classes/Stations");
const { saveStationsToDb } = require("../commons/dbActions");
require('dotenv').config();

const myStations = new Stations();
const updateInterval = process.env.UPDATE_INTERVAL || 60000;

function update() {
   myStations.fetchStations().then((stations) => {
    console.log("**** SAVING DATA ****");
    saveStationsToDb(stations);
  });
}

function updateData() {
  setInterval(async () => {
    update();
  }, updateInterval);
};

async function updateStations() {
  update();
  updateData();
}

updateStations();
