class Station {
    // Costruttore della classe
    constructor(idstazione, nomestaz, lon, soglia1, soglia2, lat, soglia3, value, temp, humidity, pressure) {
        if (!idstazione  || !nomestaz || !lon || !lat || !value) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.idstazione = idstazione;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.lat = lat;
        this.soglia1 = soglia1 ? soglia1 : 0;
        this.soglia2 = soglia2 ? soglia2 : 0;
        this.soglia3 = soglia3 ? soglia3 : 0;
        this.value = value;
        this.temp = temp ? temp : undefined;
        this.humidity = humidity ? humidity : undefined;
        this.pressure = pressure ? pressure : undefined;

    }


    isValid() {
        return !!(this.idstazione && this.nomestaz && this.value);
    }


}

module.exports = Station;