class Station {
    // Costruttore della classe
    constructor( idstazione, nomestaz, lon, lat, soglia1, soglia2, soglia3 ) {
        if ( !idstazione  || !nomestaz || !lon || !lat ) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.idstazione = idstazione;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.lat = lat;
        this.soglia1 = soglia1;
        this.soglia2 = soglia2;
        this.soglia3 = soglia3;
  
    }


    isValid() {
        return !!(this.idstazione && this.nomestaz );
    }


}

module.exports = Station;