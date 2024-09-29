class Reading {
    // Costruttore della classe
    constructor(timestamp, idstazione, nomestaz, lon, soglia1, soglia2, lat, soglia3, value, temp, humidity, pressure, rain_1h) {
        if (!timestamp, !idstazione  || !nomestaz || !lon || !lat || !value) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.timestamp = timestamp;
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
        this.rain_1h = rain_1h ? rain_1h : undefined;

    }


    isValid() {
        return !!(this.idstazione && this.nomestaz);
    }


}

module.exports = Reading;