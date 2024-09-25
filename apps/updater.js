const Readings = require("../classes/Readings.js");
const { savreReadingsToDb } = require("../commons/dbActions");
require('dotenv').config();

const myReadings = new Readings();
const updateInterval = process.env.UPDATE_INTERVAL || 60000;

function update() {
   myReadings.fetchReadings().then((readings) => {
    savreReadingsToDb(readings);
  });
}

function updateData() {
  setInterval(async () => {
    update();
  }, updateInterval);
};

async function updateReadings() {
  
  console.log(`****** Starting updater with a time interval of ${updateInterval} ******`);
  update();
  updateData();
}

updateReadings();
