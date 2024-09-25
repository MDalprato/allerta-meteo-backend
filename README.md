*** Allerta Meteo Romagna

![Alt text](alert.jpeg?raw=true "Allerta-meteo")

*Vista l'attuale situazione delle alluvioni e della loro grativà ho decito che questo progetto prenderà tutta un'altra piega.
Il progetto sarà strutturato in microservizi (al momento sono banali script nodeJS)
I servizi basilari saranno:*

- updater.js: Si occupa di ottenre i dati dalle varie stazioni e di aggiornare la collection di mongo (readings)
  La struttura del dato sarà come sotto, dove i dati aggiornati saranno dentro l'array "readings"
  
```json
{
  "_id": {
    "$oid": "66eef31028cce98af5767c97"
  },
  "stationId": "-/1264204,4391441/simnbo",
  "order": 1805,
  "stationName": "Morciano di Romagna",
  "lon": 1264204,
  "theshold1": 0.8,
  "theshold2": 1.3,
  "lat": 4391441,
  "theshold3": 1.7,
  "__v": 0
},
```
- stats.js: Si occupa di ottnere i dati salvati da updater.js nella collection di mongo e di creare statistiche quali:
  1) andamento del livello dell'acqua per una determinata staizone negli ultimi: 30 minuti, 60 minuti, 2/6/12/24/38 ore.

- weather.js: Si occupa di ottenere i dati delle previsioni meteo da un provider ogni X minuti e di aggiornare una collection rapportando location->stazione.
- future.js: Si occupa di mixare i dati statistici di stats.js con weather.js in modo da cercare di capire il rapporto che coesiste tra il meteo e l'andamento del livello dei fiumi. Per questa parte potrei valutare l'utilizzo di un servizio di IA o di Data anlytics (ma dopo aver deciso hosting e budget di spesa.)
- notificator.js: Si occupa di notificare (in qualche modo) gli allarmi