class Station {
    // Costruttore della classe
    constructor(idstazione, ordinamento, nomestaz, lon, soglia1, soglia2, lat, soglia3, value, temp, humidity, pressure) {
        if (!idstazione || !ordinamento || !nomestaz || !lon || !lat || !value) {
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
        this.value = value;
        this.temp = temp ? temp : undefined;
        this.humidity = humidity ? humidity : undefined;
        this.pressure = pressure ? pressure : undefined;

    }


    isValid() {
        return !!(this.idstazione && this.ordinamento && this.nomestaz && this.lon && this.soglia1 && this.soglia2 && this.lat && this.soglia3 && this.value);
    }


}

module.exports = Station;