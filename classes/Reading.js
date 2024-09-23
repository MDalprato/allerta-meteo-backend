class Reading {
    // Costruttore della classe
    constructor(data, value, idstazione, nomestaz) {
        if (!data || !value || !idstazione || !nomestaz) {
            throw new Error('Tutti i parametri sono obbligatori');
        }

        this.data = data;
        this.value = value;
        this.idstazione = idstazione;
        this.nomestaz = nomestaz;

    }

    isValid() {
        return !!(this.data && this.value && this.idstazione && this.nomestaz);
    }   

}

module.exports = Reading;