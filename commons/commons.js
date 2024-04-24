const moment = require('moment');

function getTimestamp() {

    var d = new Date
    d.setMilliseconds(0)
    d.setSeconds(0)
    d.setMinutes(d.getMinutes() < 31 ? 0 : 30)

    // Tira indietro di 2 ore perché nel db sono UTC
    if (moment(d).isDST())
        d.setHours(d.getHours() - 2); // Solare
    else
        d.setHours(d.getHours() - 1); // Legale

    ts = +d
    return ts;
};


module.exports = {
    getTimestamp: getTimestamp
};