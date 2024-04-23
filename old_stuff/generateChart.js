var asciichart = require ('asciichart')

function generateChart(dataInput) {

    const elNum = Object.values(dataInput).length;

    var s0 = new Array (elNum)
    for (var i = 0; i < s0.length; i++){
        const percOfullness = (Object.values(dataInput)[i].value * 100) / Object.values(dataInput)[i].soglia3;
        const cleanData = percOfullness > 0 ? percOfullness : 0;
        s0[i] = cleanData/10;
    }
     
    console.log (asciichart.plot (s0))

}

module.exports = generateChart;


/**
 * 
 * const example = {
    'Casola Valsenio': {
      nomestaz: 'Casola Valsenio',
      soglia1: -0.3,
      value: -1.26,
      soglia2: 0.3,
      soglia3: 1
    },
    Tebano: {
      nomestaz: 'Tebano',
      soglia1: 3.5,
      value: 1.84,
      soglia2: 4.5,
      soglia3: 5.5
    },
    Castelbolognese: {
      nomestaz: 'Castelbolognese',
      soglia1: 2.5,
      value: 1.36,
      soglia2: 4,
      soglia3: 6
    },
    Cotignola: {
      nomestaz: 'Cotignola',
      soglia1: 11.45,
      value: 9.52,
      soglia2: 13.6,
      soglia3: 15
    },
    Fusignano: {
      nomestaz: 'Fusignano',
      soglia1: 8.65,
      value: 4.79,
      soglia2: 10.4,
      soglia3: 12
    },
    Alfonsine: {
      nomestaz: 'Alfonsine',
      soglia1: 8.3,
      value: 5.39,
      soglia2: 10.2,
      soglia3: 12.2
    }
  }

  
 */