class Station {
    // Costruttore della classe
    constructor(idstazione, ordinamento, nomestaz, lon, soglia1, soglia2, lat, soglia3, lastValue) {
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
    }

     getPosition() {
        return {
            longitude: this.lon,
            latitude: this.lat
        };
    }

    isValid() {
        return !!(this.idstazione && this.ordinamento && this.nomestaz && this.lon && this.soglia1 && this.soglia2 && this.lat && this.soglia3);
    }

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
        }
    }

 

}

module.exports = Station;