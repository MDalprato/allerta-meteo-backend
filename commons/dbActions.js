const mongoose = require('mongoose');
const StationModel = require('../Schemas/Station');
const AlertModel = require('../Schemas/Alert');
require('dotenv').config();

const dbConnection = process.env.DB;
console.log('Saving stations to db: ', dbConnection);


async function saveStationsToDb(stationsToBeSaved) {


  if (!Array.isArray(stationsToBeSaved) || stationsToBeSaved.length === 0) {
    console.log("Invalid stations to be saved");
    return 'Error';
  }

  try {
    await mongoose.connect(dbConnection);
    const savedStations = await StationModel.insertMany(stationsToBeSaved);
    console.log(`Saved a total of ${savedStations.length} stations at ${new Date().toISOString()}`);
    return savedStations;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function saveAlertToDb(alert) {
  if (!alert) {
    console.log("Invalid alert to be saved");
    return 'Error';
  }

  try {
    await mongoose.connect(dbConnection);
    const savedAlert = await AlertModel.insertMany(alert);
    return savedAlert;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {saveStationsToDb, saveAlertToDb };
