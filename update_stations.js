const Stations = require("./classes/Stations");
const getFromDb = require("./old_stuff/getFromDb");
const mongoose = require('mongoose');

const myStations = new Stations();

myStations.fetchStations().then((stations) => { // ottengo i nuovi dati
  myStations.saveStationsToDb(stations).then(() => { // li salvo sul db

    setInterval(() => {
      myStations.fetchStations().then((stations) => {  // ottengo nuovi dati
        myStations.addNewReadings(stations).then(() => { // aggiorno solo le letture dei valori per le stazioni trovate ;)
        });
      });
    }, 60000);

  });
});