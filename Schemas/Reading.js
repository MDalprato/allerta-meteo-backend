
const mongoose = require("mongoose");

/**
 * Represents the schema for a station.
 *
 * @typedef {Object} ReadingSchema
 * @property {string} timestamp - The timestamp of the reading.
 * @property {string} idstazione - The ID of the reading.
 * @property {string} nomestaz - The name of the reading.
 * @property {number} lon - The longitude of the reading.
 * @property {number} soglia1 - The threshold 1 value of the reading.
 * @property {number} soglia2 - The threshold 2 value of the reading.
 * @property {number} lat - The latitude of the reading.
 * @property {number} soglia3 - The threshold 3 value of the reading.
 * @property {number} value - The value of the reading.
 * @property {number} temp - The temperature of the reading.
 * @property {number} humidity - The humidity of the reading.
 * @property {number} pressure - The pressure of the reading.
 * @property {number} rain_1h - The pressure of the reading.

 */
const ReadingSchema = new mongoose.Schema({

    timestamp: Date,
    idstazione: String,
    nomestaz: String,
    lon: Number,
    soglia1: Number,
    soglia2: Number,
    lat: Number,
    soglia3: Number,
    value: Number,
    temp: Number,
    humidity: Number,
    pressure: Number,
    rain_1h: Number,

});


module.exports = ReadingModel = mongoose.model("Reading", ReadingSchema);
