const http = require('http');
const mongoose = require('mongoose');
const { dbConnection } = require('./config');

// Connessione al database MongoDB tramite Mongoose
mongoose.connect(dbConnection)
    .then(() => {
        console.log("Successefully connected to MongoDB");
    })
    .catch((error) => {
        console.error("Errore durante la connessione al database MongoDB:", error);
    });

// Modello flessibile per la collezione "stations"
const Station = mongoose.model('Station', {}); // Non specifica uno schema

// Crea il server
const server = http.createServer(async (req, res) => {
    // Verifica se la richiesta è per la rotta /stazioni
    if (req.url === '/stazioni') {
        try {
            // Trova tutti i documenti nella collezione "stations"
            const stations = await Station.find().lean(); // Utilizza .lean() per ottenere oggetti JavaScript normali

            // Imposta lo status della risposta a 200 (OK)
            res.writeHead(200, {'Content-Type': 'application/json'});

            // Invia i dati delle stazioni come JSON
            res.end(JSON.stringify(stations));
        } catch (error) {
            // Se si verifica un errore, rispondi con un 500 (Internal Server Error)
            console.error("Errore durante la richiesta delle stazioni:", error);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Errore durante la richiesta delle stazioni\n');
        }
    } else {
        // Se la rotta richiesta non è /stazioni, rispondi con un 404 (Not Found)
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
});

// Definisci la porta su cui il server ascolterà le richieste
const PORT = process.env.PORT || 3000;

// Avvia il server e fai in modo che ascolti sulla porta specificata
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
