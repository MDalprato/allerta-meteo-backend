*** Allerta Meteo Romagna

![Alt text](alert.jpeg?raw=true "Allerta-meteo")

*Vista l'attuale situazione delle alluvioni e della loro grativà ho decito che questo progetto prenderà tutta un'altra piega.
Il progetto sarà strutturato in microservizi (al momento sono banali script nodeJS)
I servizi basilari saranno:*

- updater.js: Si occupa di ottenre i dati dalle varie stazioni e di aggiornare la collection di mongo (stations)
  La struttura del dato sarà come sotto, dove i dati aggiornati saranno dentro l'array "readings"
  
```json
{
  "_id": {
    "$oid": "66eef31028cce98af5767c97"
  },
  "idstazione": "-/1264204,4391441/simnbo",
  "ordinamento": 1805,
  "nomestaz": "Morciano di Romagna",
  "lon": 1264204,
  "soglia1": 0.8,
  "soglia2": 1.3,
  "lat": 4391441,
  "soglia3": 1.7,
  "readings": [
    {
      "data": {
        "$date": "2024-09-21T16:23:44.058Z"
      },
      "value": 0.11,
      "_id": {
        "$oid": "66eef31028cce98af5767c98"
      }
    }
  ],
  "__v": 0
},
```
- stats.js: Si occupa di ottnere i dati salvati da updater.js nella collection di mongo e di creare statistiche quali: