const Stations = require("./classes/Stations");
const getFromDb = require("./old_stuff/getFromDb");

const myStations = new Stations();

myStations.fetchStations().then((stations) => { // ottengo i nuovi dati
  myStations.saveStationsToDb(stations).then(() => { // li salvo sul db


    setInterval(() => {
      console.log("New readings")
      myStations.fetchStations().then((stations) => {  // ottengo nuovi dati
        myStations.addNewReadings(stations).then(() => { // aggiorno solo le letture dei valori per le stazioni trovate ;)
          console.log("saved")
        });
      });
    }, 5000);

  });
});


// devo fare in modo di aggiornare i dati delle stazioni in modo automatico ogni X minuti
// se una stazione esiste allora aggiungo una nuova lettura con la data connessa
// se non esiste la stazione allora la creo e aggiungo la lettura

