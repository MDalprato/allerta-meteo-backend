class Station {
    // Costruttore della classe
    constructor(idstazione, ordinamento, nomestaz, lon, soglia1, soglia2, lat, soglia3) {
        if (!idstazione || !ordinamento || !nomestaz || !lon || !lat) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.idstazione = idstazione;
        this.ordinamento = ordinamento;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.lat = lat;
        this.soglia1 = soglia1 ? soglia1 : 0;
        this.soglia2 = soglia2 ? soglia2 : 0;
        this.soglia3 = soglia3 ? soglia3 : 0;
        this.readings = [];
    }

    // Aggiunge una lettura alla stazione
    addReading(value) {
        this.readings.push({ data: new Date(), value: value });
    }

    // Restituisce la posizione della stazione
    getPosition() {
        return {
            longitude: this.lon,
            latitude: this.lat
        };
    }

    // Verifica se la stazione è valida
    isValid() {
        return !!(this.idstazione && this.ordinamento && this.nomestaz && this.lon && this.soglia1 && this.soglia2 && this.lat && this.soglia3);
    }

    // Restituisce un oggetto con le proprietà della stazione
    getObject() {
        return {
            idstazione: this.idstazione,
            ordinamento: this.ordinamento,
            nomestaz: this.nomestaz,
            lon: this.lon,
            soglia1: this.soglia1,
            soglia2: this.soglia2,
            lat: this.lat,
            soglia3: this.soglia3,
            readings: this.readings,
        }
    }

    getReadings() {
        return this.readings;
    }

}

module.exports = Station;