// I've never used tests before, this is the first time

const Stations = require("./classes/Stations");
const mongoose = require('mongoose');

const myStations = new Stations();
let stationsFromUrl;

// beforeAll(done => {
//     done()
//   })

test('The fetched URL is providing an array', () => {
    return myStations.fetchStations().then(stations => {
        stationsFromUrl = stations;
        expect.any(Array);
    });
});

test('Saving dava into DB successefully', () => {
    return myStations.saveStationsToDb(stationsFromUrl).then(data => {
        expect.any(Array);
    });
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

// will do a test from the server response 'curl http://localhost:3000/stazioni' ... in the future
// no need to hurry now !
