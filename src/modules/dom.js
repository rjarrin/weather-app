// Import dependencies and modules
import logoImage from '../images/weather-app-logo.png';
import searchIcon from '../images/magnify.svg';
import themeIcon from '../images/theme-light-dark.svg';
import celsius from '../images/temperature-celsius.svg';
// import fahrenheit from '../images/temperature-fahrenheit.svg';
import { fetchForecastData } from './api';

function updateCity() {
    // TODO: Return city based on the searched result

    // Return default value
    return 'Toronto';
}

function generateWeatherCard(containerName, data) {
    // Retrieve the appropriate container
    const container = document.querySelector(containerName);
    // Create the weather card for the container
    const card = document.createElement('div');
    card.classList.add('weather-card');
    // Create the weather condition image
    const img = document.createElement('img');
    img.src = `${data.icon}`;
    img.alt = data.condition;
    // Create the status text
    const status = document.createElement('p');
    status.textContent = `${data.condition}`;
    // Create the temperature text
    const temperature = document.createElement('p');
    temperature.textContent = `${data.temperature}`;
    // Append the elements to the card
    card.appendChild(img);
    card.appendChild(status);
    card.appendChild(temperature);
    container.appendChild(card);
}

function generateForecastContainer(containerName, forecastData) {
    // Retrieve the appropriate container
    const container = document.querySelector(containerName);
    // Create the hidden container for the hourly forecast
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');
    // Add forecst data to the container
    forecastData.forEach((data) => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // Hour
        const hour = document.createElement('p');
        hour.textContent = data.time_epoch
            ? new Date(data.time_epoch * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
              })
            : 'N/A';
        forecastItem.appendChild(hour);

        // Icon
        const weatherIcon = document.createElement('img');
        weatherIcon.src = data.condition.icon;
        weatherIcon.alt = data.condition ? data.condition.text : 'Icon';
        forecastItem.appendChild(weatherIcon);

        // Condition
        const condition = document.createElement('p');
        condition.textContent = data.condition ? data.condition.text : 'N/A';
        forecastItem.appendChild(condition);

        // Temperature
        const temperature = document.createElement('p');
        temperature.textContent = data.temp_c ? `${data.temp_c}°C` : 'N/A';
        forecastItem.appendChild(temperature);

        // Append all elements to the forecast container
        forecastContainer.appendChild(forecastItem);
    });

    // Append the forecast container to the specified container
    container.appendChild(forecastContainer);
}

export async function generateBodyContainer() {
    const city = updateCity();

    const weatherData = await fetchForecastData(city);

    // Extract today's weather data
    const currentWeather = {
        day: 'Today',
        icon: weatherData.current.condition.icon,
        condition: weatherData.current.condition.text,
        temperature: `${weatherData.current.temp_c}°C`,
        f_temperature: `${weatherData.current.temp_f}°F`,
    };
    generateWeatherCard('.today-container', currentWeather);

    // Extract tomorrow's weather data
    const tomorrowWeather = {
        day: 'Tomorrow',
        icon: weatherData.forecast.forecastday[1].day.condition.icon,
        condition: weatherData.forecast.forecastday[1].day.condition.text,
        temperature: `${weatherData.forecast.forecastday[1].day.avgtemp_c}°C`,
        f_temperature: `${weatherData.forecast.forecastday[1].day.avgtemp_f}°F`,
    };
    generateWeatherCard('.tomorrow-container', tomorrowWeather);

    // Extract overmorrow's weather data
    const overmorrowWeather = {
        day: 'Overmorrow',
        icon: weatherData.forecast.forecastday[2].day.condition.icon,
        condition: weatherData.forecast.forecastday[2].day.condition.text,
        temperature: `${weatherData.forecast.forecastday[2].day.avgtemp_c}°C`,
        f_temperature: `${weatherData.forecast.forecastday[1].day.avgtemp_f}°F`,
    };
    generateWeatherCard('.overmorrow-container', overmorrowWeather);

    // Extract hourly forecast data for today
    const todayHourly = weatherData.forecast.forecastday[0].hour;
    generateForecastContainer('.today-container', todayHourly);

    // Extract hourly forecast data for tomorrow
    const tomorrowHourly = weatherData.forecast.forecastday[1].hour;
    generateForecastContainer('.tomorrow-container', tomorrowHourly);

    // Extract hourly forecast data for overmorrow
    const overmorrowHourly = weatherData.forecast.forecastday[2].hour;
    generateForecastContainer('.overmorrow-container', overmorrowHourly);
}

export function generateHeader() {
    // Identify the header
    const header = document.getElementById('header');

    // Create the logo image for the container
    const logo = document.createElement('img');
    logo.id = 'logo-image';
    logo.src = logoImage;
    logo.alt = 'Logo';

    // Generate a container to hold the title and city name
    const textContainer = document.createElement('div');
    textContainer.classList.add('row-format');
    // Create the title text
    const title = document.createElement('h2');
    title.textContent = 'My Weather App';
    // Create the city name text
    const cityName = document.createElement('p');
    cityName.textContent = updateCity();
    // Append the title and city to the text container
    textContainer.appendChild(title);
    textContainer.appendChild(cityName);

    // Generate a container to hold the search elements
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    // Create the search icon
    const search = document.createElement('img');
    search.id = 'search-icon';
    search.src = searchIcon;
    search.alt = 'Search';
    // Create the search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = 'search-bar';
    searchBar.placeholder = 'Search city';
    // Append the search icon and search bar to the search container
    searchContainer.appendChild(search);
    searchContainer.appendChild(searchBar);

    // Create temp-toggle button for the container
    const toggle = document.createElement('img');
    toggle.id = 'temperature-toggle';
    toggle.src = celsius;
    toggle.alt = 'Toggle';

    // Create theme button for the container
    const theme = document.createElement('img');
    theme.id = 'theme-icon';
    theme.src = themeIcon;
    theme.alt = 'Theme';

    // Append header elements to header container
    header.appendChild(logo);
    header.appendChild(textContainer);
    header.appendChild(searchContainer);
    header.appendChild(toggle);
    header.appendChild(theme);
}
