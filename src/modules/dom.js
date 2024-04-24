// Import dependencies and modules
import logoImage from '../images/weather-app-logo.png';
import searchIcon from '../images/magnify.svg';
import themeIcon from '../images/theme-light-dark.svg';
import celsius from '../images/temperature-celsius.svg';
import fahrenheit from '../images/temperature-fahrenheit.svg';
import { fetchForecastData } from './api';

// Globals to hold weather data (avoid fetching multiple times)
let todayInformation;
let tomorrowInformation;
let overmorrowInformation;
let weatherInformation;

function defaultCity() {
    // Return default value
    return 'Toronto, Ontario';
}

function generateWeatherCard(containerName, data) {
    // Retrieve the appropriate container
    const container = document.querySelector(containerName);
    // Create the weather card for the container
    const card = document.createElement('div');
    card.classList.add('weather-card');
    // Create the weather condition image
    const img = document.createElement('img');
    img.classList.add('weather-icon');
    img.src = `${data.icon}`;
    img.alt = data.condition;
    // Create the status text
    const status = document.createElement('p');
    status.classList.add('weather-status');
    status.textContent = `${data.condition}`;
    // Create the temperature text
    const temperature = document.createElement('p');
    temperature.classList.add('weather-temperature');
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
        hour.classList.add('forecast-hour');
        // console.log(hour.textContent);
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
        temperature.classList.add('forecast-temperature');
        temperature.textContent = data.temp_c ? `${data.temp_c}°C` : 'N/A';
        forecastItem.appendChild(temperature);

        // Append all elements to the forecast container
        forecastContainer.appendChild(forecastItem);
    });

    // Append the forecast container to the specified container
    container.appendChild(forecastContainer);

    // In today-container, scroll to nearest hour (instead of starting from 12:00 AM on hover)
    if (containerName === '.today-container') {
        // Convert current hour to XX:00 AM/PM format for comparison
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        const currentHour = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        // Get all forecast-item divs in the today-container
        const forecastItems =
            forecastContainer.querySelectorAll('.forecast-item');
        // Loop through each item/card
        forecastItems.forEach((item) => {
            const hourElement = item.querySelector('.forecast-hour');
            // Compare if hour in item matches current hour (rounded down to nearest hour)
            if (
                hourElement &&
                hourElement.textContent.startsWith(currentHour)
            ) {
                // Scroll to the current hour
                forecastContainer.scrollLeft =
                    item.offsetLeft - forecastContainer.offsetLeft;
            }
        });
    }
}

function retrieveDateWeather(weatherData, key) {
    let data;
    switch (key) {
        case 0:
            data = {
                day: 'Today',
                icon: weatherData.current.condition.icon,
                condition: weatherData.current.condition.text,
                temperature: `${weatherData.current.temp_c}°C`,
                f_temperature: `${weatherData.current.temp_f}°F`,
            };
            break;

        case 1:
            data = {
                day: 'Tomorrow',
                icon: weatherData.forecast.forecastday[1].day.condition.icon,
                condition:
                    weatherData.forecast.forecastday[1].day.condition.text,
                temperature: `${weatherData.forecast.forecastday[1].day.avgtemp_c}°C`,
                f_temperature: `${weatherData.forecast.forecastday[1].day.avgtemp_f}°F`,
            };
            break;

        case 2:
            data = {
                day: 'Overmorrow',
                icon: weatherData.forecast.forecastday[2].day.condition.icon,
                condition:
                    weatherData.forecast.forecastday[2].day.condition.text,
                temperature: `${weatherData.forecast.forecastday[2].day.avgtemp_c}°C`,
                f_temperature: `${weatherData.forecast.forecastday[2].day.avgtemp_f}°F`,
            };
            break;

        default:
            console.error('Something went wrong with retrieveDateWeather');
            break;
    }
    return data;
}

export async function generateBodyContainer(city) {
    const weatherData = await fetchForecastData(city);

    // Extract today's weather data
    const currentWeather = retrieveDateWeather(weatherData, 0);
    generateWeatherCard('.today-container', currentWeather);

    // Extract tomorrow's weather data
    const tomorrowWeather = retrieveDateWeather(weatherData, 1);
    generateWeatherCard('.tomorrow-container', tomorrowWeather);

    // Extract overmorrow's weather data
    const overmorrowWeather = retrieveDateWeather(weatherData, 2);
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

    // Update global information
    todayInformation = currentWeather;
    tomorrowInformation = tomorrowWeather;
    overmorrowInformation = overmorrowWeather;
    weatherInformation = weatherData;
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
    cityName.id = 'header-city-name';
    cityName.textContent = defaultCity();
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

export function updateWeatherCardTemp(isCelsius) {
    const array = [
        '.today-container',
        '.tomorrow-container',
        '.overmorrow-container',
    ];
    const weatherArray = [
        todayInformation,
        tomorrowInformation,
        overmorrowInformation,
    ];
    if (isCelsius) {
        // Change all temperature code to Celsius if the flag is set to true
        array.forEach((containerName, index) => {
            // Retrieve the appropriate container element
            const containerText = document.querySelector(
                `${containerName} .weather-temperature`,
            );
            // Change to Celsius
            containerText.textContent = weatherArray[index].temperature;
        });
    } else {
        // Else, change all temperature code to Fahrenheit
        array.forEach((containerName, index) => {
            // Retrieve the appropriate container element
            const containerText = document.querySelector(
                `${containerName} .weather-temperature`,
            );
            // Change to Fahrenheit
            containerText.textContent = weatherArray[index].f_temperature;
        });
    }
}

export function updateForecastCardsTemp(isCelsius) {
    const array = [
        '.today-container',
        '.tomorrow-container',
        '.overmorrow-container',
    ];
    const weatherArray = [
        weatherInformation.forecast.forecastday[0].hour,
        weatherInformation.forecast.forecastday[1].hour,
        weatherInformation.forecast.forecastday[2].hour,
    ];
    // Iterate over each forecast container
    array.forEach((containerName, index) => {
        // Select the forecast container element
        const forecastContainer = document.querySelector(
            `${containerName} .forecast-container`,
        );
        // Select all forecast items within the current forecast container
        const forecastItems =
            forecastContainer.querySelectorAll('.forecast-item');
        // Iterate over each forecast item
        forecastItems.forEach((item, itemIndex) => {
            const temperatureElement = item.querySelector(
                '.forecast-temperature',
            );
            // Check if the temperature should be displayed in Celsius
            if (isCelsius) {
                // Update the temperature text to Celsius
                temperatureElement.textContent = `${weatherArray[index][itemIndex].temp_c}°C`;
            } else {
                // Update the temperature text to Fahrenheit
                temperatureElement.textContent = `${weatherArray[index][itemIndex].temp_f}°F`;
            }
        });
    });
}

export function changeToggleIcon(isCelsius) {
    const image = document.getElementById('temperature-toggle');
    if (isCelsius) {
        image.src = celsius;
    } else {
        image.src = fahrenheit;
    }
}

function updateWeather(containerName, data, isCelsius) {
    const pathShortcut = `${containerName} .weather-card`;
    // Update weather card image
    const image = document.querySelector(`${pathShortcut} .weather-icon`);
    image.src = `${data.icon}`;
    image.alt = data.condition;
    // Update weather card status
    const status = document.querySelector(`${pathShortcut} .weather-status`);
    status.textContent = `${data.condition}`;
    // Update weather card temperature
    const temperature = document.querySelector(
        `${pathShortcut} .weather-temperature`,
    );
    if (isCelsius) {
        temperature.textContent = `${data.temperature}`;
    } else {
        temperature.textContent = `${data.f_temperature}`;
    }
}

export function updateCityWeather(weatherData, isCelsius) {
    // Update the header with the new city name
    const headerCity = document.getElementById('header-city-name');
    headerCity.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    // Extract today's weather data
    const currentWeather = retrieveDateWeather(weatherData, 0);
    // Extract tomorrow's weather data
    const tomorrowWeather = retrieveDateWeather(weatherData, 1);
    const overmorrowWeather = retrieveDateWeather(weatherData, 2);
    // Update the weather cards (Today, Tomorrow, Overmorrow)
    const array = [
        '.today-container',
        '.tomorrow-container',
        '.overmorrow-container',
    ];
    const weatherArray = [currentWeather, tomorrowWeather, overmorrowWeather];
    array.forEach((containerName, index) => {
        updateWeather(containerName, weatherArray[index], isCelsius);
    });
    todayInformation = currentWeather;
    tomorrowInformation = tomorrowWeather;
    overmorrowInformation = overmorrowWeather;
    weatherInformation = weatherData;
    updateForecastCardsTemp(isCelsius);
}
