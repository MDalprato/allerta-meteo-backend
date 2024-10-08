
require('dotenv').config();
const axios = require('axios');

// Sostituisci con la tua API key di OpenWeatherMap
const apiKey = process.env.OPENWEATHER_API;
// Funzione per ottenere le previsioni del tempo
function getWeatherByCity(city) {

    return new Promise(async (resolve, reject) => {

        if (apiKey === undefined || apiKey == "") {
            reject("No api key");
            return;

        }
        try {
            // URL dell'API con la città e la chiave API
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            console.log(url);
            // Richiesta con axios
            const response = await axios.get(url);

            // Estrarre i dati dalle previsioni
            const weatherData = response.data;
            // console.log(`temp: ${weatherData.main.temp}°C`);
            // console.log(`humidity: ${weatherData.main.humidity}`);
            // console.log(`pressure: ${weatherData.main.pressure}`);
            // console.log(`rain: ${weatherData.rain["1h"]}`);

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


        if (apiKey === undefined || apiKey == "") {
            reject("No api key");
            return;
        }

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
            // console.log(`temp: ${weatherData.main.temp}°C`);
            // console.log(`humidity: ${weatherData.main.humidity}`);
            // console.log(`pressure: ${weatherData.main.pressure}`);
            // console.log(`rain: ${weatherData.rain["1h"]}`);
            resolve(weatherData);
        } catch (error) {
            console.error('Errore durante il recupero delle previsioni:', error);
            reject(error);
        }
    });
}

module.exports = { getWeatherByCoordinates, getWeatherByCity }; 
