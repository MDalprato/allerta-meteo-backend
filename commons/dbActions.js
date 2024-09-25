const mongoose = require('mongoose');
const StationModel = require('../Schemas/Reading');
const AlertModel = require('../Schemas/Alert');
require('dotenv').config();

const dbConnection = process.env.DB;
console.log('Saving readings to db: ', dbConnection);


async function savreReadingsToDb(readingsToBeSaved) {


  if (!Array.isArray(readingsToBeSaved) || readingsToBeSaved.length === 0) {
    console.log("Invalid readings to be saved");
    return 'Error';
  }

  try {
    await mongoose.connect(dbConnection);
    const savedStations = await StationModel.insertMany(readingsToBeSaved);
    console.log(`Saved a total of ${savedStations.length} readings at ${new Date().toISOString()}`);
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

module.exports = {savreReadingsToDb, saveAlertToDb };
