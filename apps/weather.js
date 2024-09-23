
require('dotenv').config();
const axios = require('axios');

// Sostituisci con la tua API key di OpenWeatherMap
const apiKey = process.env.OPENWEATHER_API;
console.log(apiKey)
// Funzione per ottenere le previsioni del tempo
function getWeatherByCity(city) {
    return new Promise(async (resolve, reject) => {
        try {
            // URL dell'API con la città e la chiave API
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            console.log(url);
            // Richiesta con axios
            const response = await axios.get(url);

            // Estrarre i dati dalle previsioni
            const weatherData = response.data;
            console.log(`temp: ${weatherData.main.temp}°C`);
            console.log(`humidity: ${weatherData.main.humidity}`);
            console.log(`pressure: ${weatherData.main.pressure}`);

            if (weatherData.rain && weatherData.rain["1h"]) {
                console.log(`rain: ${weatherData.rain["1h"]}`);
            } else {
                console.log('rain: No data');
            }

            console.log(`Condizioni: ${weatherData.weather[0].description}`);
            resolve(weatherData);
        } catch (error) {
            console.error('Errore durante il recupero delle previsioni:', error);
            reject(error);
        }
    });
}

// Funzione per ottenere le previsioni del tempo
function getWeatherByCoordinates(lat, lon) {
    return new Promise(async (resolve, reject) => {

        // Convertire lat e lon in numeri con decimali
        lat = lat / 100000;
        lon = lon / 100000;
        try {
            // URL dell'API con le coordinate geografiche e la chiave API
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            // Richiesta con axios
            const response = await axios.get(url);

            // Estrarre i dati dalle previsioni
            const weatherData = response.data;
            console.log(`Città: ${weatherData.name}`);
            console.log(`temp: ${weatherData.main.temp}°C`);
            console.log(`humidity: ${weatherData.main.humidity}`);
            console.log(`pressure: ${weatherData.main.pressure}`);

            if (weatherData.rain && weatherData.rain["1h"]) {
                console.log(`rain: ${weatherData.rain["1h"]}`);
            } else {
                console.log('rain: No data');
            }

            console.log(`Condizioni: ${weatherData.weather[0].description}`);
            resolve(weatherData);
        } catch (error) {
            console.error('Errore durante il recupero delle previsioni:', error);
            reject(error);
        }
    });
}


// Usa la funzione passando il nome della città
//getWeatherByCity('Faenza');
// getWeatherByCoordinates(44.31006, 11.82482);

module.exports = {getWeatherByCoordinates, getWeatherByCity}; 
