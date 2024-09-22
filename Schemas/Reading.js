
const mongoose = require("mongoose");

/**
 * Schema for station readings.
 *
 * @typedef {Object} Reading
 * @property {Date} data - The date of the reading.
 * @property {Number} value - The value of the reading.
 * @property {String} idstazione - The ID of the station.
 * @property {String} nomestaz - The name of the station.
 */

const ReadingSchema = new mongoose.Schema({
    data: Date,
    value: Number,
    idstazione: String,
    nomestaz: String,
});

module.exports = ReadingModel = mongoose.model("Reading", ReadingSchema);
