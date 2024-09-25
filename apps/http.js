const express = require('express');
const mongoose = require('mongoose');
const { getReadingsFromDb, getReadingsByStationName } = require('../commons/dbActions');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

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

/**
 * @swagger
 * /reading:
 *   get:
 *     summary: Ottiene le letture della stazione meteorologica
 *     parameters:
 *       - in: query
 *         name: time
 *         schema:
 *           type: string
 *           example: 1h
 *         description: Tempo delle letture richieste, es. 1h per l'ultima ora
 *     responses:
 *       200:
 *         description: Successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     example: "2024-09-25T10:00:00Z"
 *                   temperature:
 *                     type: number
 *                     example: 24.5
 *                   humidity:
 *                     type: number
 *                     example: 60
 *       500:
 *         description: Errore del server
 */
app.get('/reading', async (req, res) => {
    const timeParam = req.query.time || '1h';  // Default a 1h

    // Estrazione del tempo specificato in ore
    const hours = parseInt(timeParam.replace('h', ''));
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - hours * 60 * 60 * 1000);  // Sottrae le ore specificate

    try {
        const readings = await getReadingsFromDb(startTime);

        res.status(200).json(readings);
    } catch (error) {
        console.error("Errore durante la richiesta delle letture:", error);
        res.status(500).send('Errore durante la richiesta delle letture');
    }
});



/**
 * @swagger
 * /stationData:
 *   get:
 *     summary: Ottiene tutte le letture per una stazione specifica
 *     parameters:
 *       - in: query
 *         name: stationName
 *         schema:
 *           type: string
 *           example: "Savignano"
 *         description: Nome della stazione per cui ottenere le letture
 *     responses:
 *       200:
 *         description: Successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     example: "2024-09-25T10:00:00Z"
 *                   temperature:
 *                     type: number
 *                     example: 24.5
 *                   humidity:
 *                     type: number
 *                     example: 60
 *       400:
 *         description: Nome della stazione non fornito
 *       500:
 *         description: Errore del server
 */
app.get('/stationData', async (req, res) => {
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

// Porta del server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
    console.log(`Documentazione API disponibile su http://localhost:${PORT}/api-docs`);
});
