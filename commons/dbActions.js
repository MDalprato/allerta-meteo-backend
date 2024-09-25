const mongoose = require('mongoose');
const ReadingModel = require('../Schemas/Reading');
const AlertModel = require('../Schemas/Alert');
require('dotenv').config();

const dbConnection = process.env.DB;


async function savreReadingsToDb(readingsToBeSaved) {


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

module.exports = { savreReadingsToDb, saveAlertToDb, getReadingsFromDb};
