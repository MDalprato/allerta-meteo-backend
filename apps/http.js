const express = require('express');
const mongoose = require('mongoose');
const { getReadingsFromDb, getReadingsByStationName, getAllStations, getReadingsByStationId, getLastReadingsForAllStations } = require('../commons/dbActions');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const cors = require('cors');
const { updateReadings } = require('./updater');


const corsOptions = {
    origin: '*', // Sostituisci con il dominio da cui fai le richieste
    methods: 'GET,POST', // Puoi specificare i metodi che vuoi consentire
    allowedHeaders: ['Content-Type', 'Authorization'], // Intestazioni consentite
    optionsSuccessStatus: 200 // Per i browser che non supportano lo status 204 per le preflight requests
};

app.use(cors(corsOptions));



// Configurazione Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather Station API',
            version: '1.0.0',
            description: 'API per ottenere le letture della stazione meteorologica',
            contact: {
                name: 'GOD OF ALL'
            },
            servers: [
                {
                    url: 'http://localhost:8080'
                }
            ]
        }
    },
    apis: [__dirname + '/http.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/readings', async (req, res) => {
    const timeParam = req.query.time;

    try {
        let readings;
        if (!timeParam) {
            // Ottieni l'ultima lettura per ogni stazione
            readings = await getLastReadingsForAllStations();
        } else {
            // Estrazione del tempo specificato in ore
            const hours = parseInt(timeParam.replace('h', ''));
            const currentTime = new Date();
            const startTime = new Date(currentTime.getTime() - hours * 60 * 60 * 1000);  // Sottrae le ore specificate

            readings = await getReadingsFromDb(startTime);
        }

        res.status(200).json(readings);
    } catch (error) {
        console.error("Errore durante la richiesta delle letture:", error);
        res.status(500).send('Errore durante la richiesta delle letture');
    }
});




app.get('/get_readings_by_station_name', async (req, res) => {
    const { stationName } = req.query;

    if (!stationName) {
        return res.status(400).send('Il parametro "stationName" è obbligatorio.');
    }

    try {
        const readings = await getReadingsByStationName(stationName);
        res.status(200).json(readings);
    } catch (error) {
        console.error("Errore durante la richiesta delle letture per la stazione:", error);
        res.status(500).send('Errore durante la richiesta delle letture per la stazione');
    }
});



app.get('/get_readings_by_station_id', async (req, res) => {
    const { stationId } = req.query;

    if (!stationId) {
        return res.status(400).send('Il parametro "stationId" è obbligatorio.');
    }

    try {
        const readings = await getReadingsByStationId(stationId);
        res.status(200).json(readings);
    } catch (error) {
        console.error("Errore durante la richiesta delle letture per la stazione:", error);
        res.status(500).send('Errore durante la richiesta delle letture per la stazione');
    }
});

app.get('/stations', async (req, res) => {
    try {
        const readings = await getAllStations();
        res.status(200).json(readings);
    } catch (error) {
        console.error("Errore durante la richiesta delle stazioni:", error);
        res.status(500).send('Errore durante la richiesta delle stazioni');
    }
});

// Porta del server
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
    console.log(`Documentazione API disponibile su http://localhost:${PORT}/api-docs`);
    updateReadings();
});
