const mongoose = require('mongoose');
const StationModel = require('../Schemas/Station');
const ReadingModel = require('../Schemas/Reading');
const { dbConnection } = require('../config');

async function saveReadingsToDb(readingsToBeSaved) {
    if (!Array.isArray(readingsToBeSaved) || readingsToBeSaved.length === 0) {
      console.log("Invalid readings to be saved");
      return 'Invalid readings to be saved';
    }
  
    try {
      await mongoose.connect(dbConnection);
      const savedReadings = await ReadingModel.insertMany(readingsToBeSaved);
      console.log(`Saved a total of ${savedReadings.length} readings at ${new Date().toISOString()}`);
      return savedReadings;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
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

module.exports = {saveReadingsToDb, saveStationsToDb};
