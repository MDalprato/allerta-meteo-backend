// this script is used to update the db with the new data from the api

const Stations = require("../classes/Stations");
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