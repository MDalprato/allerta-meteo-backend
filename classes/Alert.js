class Alert {

    /**
 * Schema for station readings.
 *
 * @typedef {Object} Alert
 * @property {Date} data - The date of the reading.
 * @property {String} idstazione - The ID of the station.
 * @property {String} nomestaz - The name of the station.  
 * @property {Number} typeOfAlert - The value of the reading.
 */


    // Costruttore della classe
    constructor(data, idstazione, nomestaz, typeOfAlert) {
        if (!data || !idstazione || !nomestaz || !typeOfAlert) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.data = data;
        this.idstazione = idstazione;
        this.nomestaz = nomestaz;
        this.typeOfAlert = typeOfAlert;

    }

    isValid() {
        return !!(this.data && this.idstazione && this.nomestaz && this.typeOfAlert);
    }
   

}

module.exports = Alert;