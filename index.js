// Importa il modulo http di Node.js
const http = require('http');

// Crea il server
const server = http.createServer((req, res) => {
    // Verifica se la richiesta è per la rotta /stazioni
    if (req.url === '/stazioni') {
        // Imposta lo status della risposta a 200 (OK)
        res.writeHead(200, {'Content-Type': 'text/plain'});

        // Invia la risposta "Hello World"
        res.end('Hello World\n');
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
