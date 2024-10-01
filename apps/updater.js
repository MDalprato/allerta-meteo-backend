const Readings = require("../classes/Readings.js");
const Stations = require("../classes/Stations.js");
const { saveReadingsToDb, saveStationsToDb } = require("../commons/dbActions");
require('dotenv').config();

const myReadings = new Readings();
const myStations = new Stations();

const updateInterval = process.env.UPDATE_INTERVAL || 60000;

// Readings ---
function singleReadingsUpdate() {
   myReadings.fetchReadings().then((readings) => {
    saveReadingsToDb(readings);
  });
}

function timerForReadings() {
  setInterval(async () => {
    this.singleReadingUpdate();
  }, updateInterval);
};

// stations ...

function singleStationsUpdate() {
  myStations.fetchStations().then((stations) => {
   saveStationsToDb(stations);
 });
}

function timerForStations() {
 setInterval(async () => {
  this.singleStationsUpdate();
 }, updateInterval * 10);
};


async function updateReadings() {
  
  console.log(`****** Starting updater with a time interval of ${updateInterval} ******`);
  singleReadingsUpdate();
  singleStationsUpdate();
  timerForReadings();
  timerForStations();
}

updateReadings();
