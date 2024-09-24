
const mongoose = require("mongoose");

/**
 * Represents the schema for a station.
 *
 * @typedef {Object} StationSchema
 * @property {string} idstazione - The ID of the station.
 * @property {string} nomestaz - The name of the station.
 * @property {number} lon - The longitude of the station.
 * @property {number} soglia1 - The threshold 1 value of the station.
 * @property {number} soglia2 - The threshold 2 value of the station.
 * @property {number} lat - The latitude of the station.
 * @property {number} soglia3 - The threshold 3 value of the station.
 * @property {number} value - The value of the station.
 * @property {number} temp - The temperature of the station.
 * @property {number} humidity - The humidity of the station.
 * @property {number} pressure - The pressure of the station.
 * @property {number} rain_1h - The pressure of the station.

 */
const StationSchema = new mongoose.Schema({

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


module.exports = StationModel = mongoose.model("Station", StationSchema);
