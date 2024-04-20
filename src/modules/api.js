// Define file macros
const API_KEY = 'd2f02578eea344a18f1221808241304';

export async function fetchWeatherData(city) {
    let data;
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    try {
        const response = await fetch(`${url}&cacheBuster=${Date.now()}`);
        data = await response.json();
        return data;
    } catch (error) {
        console.error(
            'in api.js - fetchWeatherData(), error occured with fetching',
        );
    }
    return data;
}

export async function fetchForecastData(city) {
    let data;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
    try {
        const response = await fetch(`${url}&cacheBuster=${Date.now()}`);
        data = await response.json();
    } catch (error) {
        console.error(
            'In api.js - fetchForecastData, error occured on fetch request',
        );
    }
    console.log(data);
    return data;
}
