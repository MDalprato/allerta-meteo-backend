
const mongoose = require("mongoose");

/**
 * Schema for station readings.
 *
 * @typedef {Object} Alert
 * @property {Date} data - The date of the reading.
 * @property {String} idstazione - The ID of the station.
 * @property {String} nomestaz - The name of the station.  
 * @property {Number} typeOfAlert - The value of the reading.
 */

const AlertSchema = new mongoose.Schema({
    data: Date,
    value: Number,
    idstazione: String,
    nomestaz: String,
    typeOfAlert: String, // red, yellow, green
});

module.exports = AlertModel = mongoose.model("Alert", AlertSchema);
