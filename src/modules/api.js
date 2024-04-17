// Define file macros
const API_KEY = 'd2f02578eea344a18f1221808241304';
const BASE_URL = 'http://api.weatherapi.com/v1/';

async function fetchWeatherData(city) {
    let data = null;
    try {
        const response = await fetch(
            `${BASE_URL}current.json?key=${API_KEY}&q=${city}`, { mode: 'cors'}
        );
        data = await response.json();
        return data;
    } catch (error) {
        console.error(
            'in api.js - fetchWeatherData(), error occured with fetching',
        );
    }
    return data;
}

async function fetchForecastData(city) {
    let data = null;
    try {
        const response = await fetch(
            `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}`,
        );
        data = await response.json();
    } catch (error) {
        console.error(
            'In api.js - fetchForecastData, error occured on fetch request',
        );
    }
    return data;
}

export { fetchWeatherData, fetchForecastData };
