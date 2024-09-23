
require('dotenv').config();
const axios = require('axios');

// Sostituisci con la tua API key di OpenWeatherMap
const apiKey = process.env.OPENWEATHER_API;
console.log(apiKey)

// Funzione per ottenere le previsioni del tempo
async function getWeatherByCity(city) {
  try {
    // URL dell'API con la città e la chiave API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(url)
    // Richiesta con axios
    const response = await axios.get(url);

    // Estrarre i dati dalle previsioni
    const weatherData = response.data;
    console.log(`Previsioni del tempo per ${city}:`);
    console.log(`Temperatura: ${weatherData.main.temp}°C`);
    console.log(`Condizioni: ${weatherData.weather[0].description}`);
  } catch (error) {
    console.error('Errore durante il recupero delle previsioni:', error);
  }
}

// Usa la funzione passando il nome della città
getWeatherByCity('Faenza');
