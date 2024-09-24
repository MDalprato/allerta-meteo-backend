# Usa l'immagine ufficiale di Node.js come base
FROM node:18

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia il file package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install --only=production

# Copia il resto dell'applicazione all'interno del container
COPY . .

# Imposta le variabili d'ambiente
ENV DEBUG=false
ENV UPDATE_INTERVAL=3600000
ENV DB=mongodb://localhost:27017/allerta_meteo

# Specifica il comando che verrà eseguito quando il container si avvia
CMD ["npm", "run", "updater"]

#docker build -t updater .
#docker run -d updater
