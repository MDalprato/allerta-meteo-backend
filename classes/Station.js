class Station {
    // Costruttore della classe
    constructor( idstazione, nomestaz, lon, lat) {
        if ( !idstazione  || !nomestaz || !lon || !lat ) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.idstazione = idstazione;
        this.nomestaz = nomestaz;
        this.lon = lon;
        this.lat = lat;
  
    }


    isValid() {
        return !!(this.idstazione && this.nomestaz );
    }


}

module.exports = Station;