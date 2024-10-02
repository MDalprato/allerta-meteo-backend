
const mongoose = require("mongoose");

/**
 * Represents the schema for a station.
 *
 * @typedef {Object} StationSchema
 * @property {string} idstazione - The ID of the reading.
 * @property {string} nomestaz - The name of the reading.
 * @property {number} lon - The longitude of the reading.
 * @property {number} lat - The latitude of the reading.
 * @property {number} soglia1 - The first threshold of the reading.
 * @property {number} soglia2 - The second threshold of the reading.
 * @property {number} soglia3 - The third threshold of the reading.


 */
const StationSchema = new mongoose.Schema({
    idstazione: String,
    nomestaz: String,
    lon: Number,
    lat: Number,
    soglia1: Number,
    soglia2: Number,
    soglia3: Number
});


module.exports = StationModel = mongoose.model("Station", StationSchema);
