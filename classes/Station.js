class Station {
    // Costruttore della classe
    constructor(ordinamento, nomestaz, lon, soglia1, value, soglia2, lat, soglia3) {

        this.idstazione = ordinamento;
        this.ordinamento = ordinamento;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.soglia1 = soglia1;
        this.value = value;
        this.soglia2 = soglia2;
        this.lat = lat;
        this.soglia3 = soglia3;

    }
    // Metodi della classe
    getPosition() {

        return {
            longitude: this.longitude,
            latitude: this.latitude
        };
    }

    getIfIsOverThreshold() {
        return this.value > this.soglia1;
    }

    getIfIsUnderThreshold() {
        return this.value < this.soglia1;
    }

    getWhichThreshold() {
        if (this.value > this.soglia1) {
            return 1;
        } else if (this.value < this.soglia1) {
            return 2;
        } else {
            return 3;
        }
    }   

    getValue() {
        return this.value;
    }

}

module.exports = Station;