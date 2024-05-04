class Station {
    // Costruttore della classe

    constructor(idstazione, ordinamento, nomestaz, lon, soglia1, soglia2, lat, soglia3) {

        this.idstazione = idstazione;
        this.ordinamento = ordinamento;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.soglia1 = soglia1;
        this.soglia2 = soglia2;
        this.lat = lat;
        this.soglia3 = soglia3;
        this.readings = [];
    }

    addReading(value){
        this.readings.push({data: new Date(), value: value})
    }
   
    getPosition() {
        return {
            longitude: this.longitude,
            latitude: this.latitude
        };
    }

    isValid() {
        return this.idstazione && this.ordinamento && this.nomestaz && this.lon && this.soglia1 && this.soglia2 && this.lat && this.soglia3;
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
            readings: this.readings,
        }
    }

    getReadings() {
        return this.readings;
    }
    
}

module.exports = Station;