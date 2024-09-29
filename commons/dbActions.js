const mongoose = require('mongoose');
const ReadingModel = require('../Schemas/Reading');
const AlertModel = require('../Schemas/Alert');
const StationModel = require('../Schemas/Station');
require('dotenv').config();

const dbConnection = process.env.DB;

async function saveReadingsToDb(readingsToBeSaved) {


  if (!Array.isArray(readingsToBeSaved) || readingsToBeSaved.length === 0) {
    console.log("Invalid readings to be saved");
    return 'Error';
  }

  try {
    await mongoose.connect(dbConnection);
    const savedReading = await ReadingModel.insertMany(readingsToBeSaved);
    console.log(`Saved a total of ${savedReading.length} readings at ${new Date().toISOString()}`);
    return savedReading;
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
    const savedStations = [];

    for (const station of stationsToBeSaved) {
      const updatedStation = await StationModel.findOneAndUpdate(
        { idstazione: station.idstazione }, // Assuming stationId is the unique identifier
        station,
        { new: true, upsert: true } // Create a new document if no match is found
      );
      savedStations.push(updatedStation);
    }

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


async function getReadingsFromDb(startTime) {
  try {
    await mongoose.connect(dbConnection);

    const readings = await ReadingModel.find({
      timestamp: { $gte: startTime }
    }).lean();

    return readings;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


// dbActions.js
async function getReadingsByStationName(stationName) {
  try {
    await mongoose.connect(dbConnection);

    const readings = await ReadingModel.find({
      nomestaz: stationName
    }).lean();

    return readings;
  } catch (error) {
    throw new Error('Errore durante il recupero delle letture: ' + error.message);
  }
}


// dbActions.js
async function getAllStations() {
  try {
    await mongoose.connect(dbConnection);

    const stations = await StationModel.find({}).lean();
    return stations;

  } catch (error) {
    throw new Error('Errore durante il recupero delle letture: ' + error.message);
  }
}



module.exports = {getAllStations, saveStationsToDb, saveReadingsToDb, saveAlertToDb, getReadingsFromDb, getReadingsByStationName };
