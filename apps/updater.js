const Stations = require("../classes/Stations");
const { saveStationsToDb } = require("../commons/dbActions");
require('dotenv').config();

const myStations = new Stations();
const updateInterval = process.env.UPDATE_INTERVAL || 60000;

function update() {
   myStations.fetchStations().then((stations) => {
    saveStationsToDb(stations);
  });
}

function updateData() {
  setInterval(async () => {
    update();
  }, updateInterval);
};

async function updateStations() {
  
  console.log(`
    _____ _             _   _             
   / ____| |           | | (_)            
  | (___ | |_ __ _ _ __| |_ _  ___  _ __  
   \\___ \\| __/ _\` | '__| __| |/ _ \\| '_ \\ 
   ____) | || (_| | |  | |_| | (_) | | | |
  |_____/ \\__\\__,_|_|   \\__|_|\\___/|_| |_|
  `);

  console.log("**** Starting updater with a time interval of ", updateInterval);
  update();
  updateData();
}

updateStations();
