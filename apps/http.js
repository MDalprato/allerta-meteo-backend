const http = require('http');

const server = http.createServer(async (req, res) => {
    if (req.url === '/stations') {
        try {
            const stations = await Station.find().lean(); // Utilizza .lean() per ottenere oggetti JavaScript normali
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(stations));
        } catch (error) {
            console.error("Errore durante la richiesta delle stazioni:", error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Errore durante la richiesta delle stazioni\n');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ┬┌─┐  ┬─┐┬ ┬┌┐┌┌┐┌┬┌┐┌┌─┐ ");
    console.log("└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  │└─┐  ├┬┘│ │││││││││││ ┬  ");
    console.log("└─┘└─┘┴└─ └┘ └─┘┴└─  ┴└─┘  ┴└─└─┘┘└┘┘└┘┴┘└┘└─┘ ");
});