import { fetchForecastData } from './api';
import {
    updateWeatherCardTemp,
    updateForecastCardsTemp,
    changeToggleIcon,
    updateCityWeather,
} from './dom';

// Set flag/toggle for Celsius units
let isCelsius = true;

function handleCitySearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const city = searchBar.value.trim();
            try {
                const weatherData = await fetchForecastData(city);
                updateCityWeather(weatherData, isCelsius);
            } catch (error) {
                console.error(
                    'in ui.js - handleCitySearch(), error occurred with city search',
                );
                // TODO: SHOW ERROR MESSAGE TO THE USER
                // Display error message to the user
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Invalid city. Please try again.';
                errorMsg.classList.add('error-message');
                document.getElementById('header').appendChild(errorMsg);
                // Remove the error message after 3 seconds
                setTimeout(() => errorMsg.remove(), 3000);
            }
            // if (city) {
            //     try {
            //         await generateBodyContainer(city);
            //         document.querySelector(".city-name").textContent = city;
            //     } catch (error) {
            //         console.error("Error fetching weather data for city:", city);
            //         // Display error message to the user
            //         const errorMsg = document.createElement("p");
            //         errorMsg.textContent = "Invalid city. Please try again.";
            //         errorMsg.classList.add("error-message");
            //         document.getElementById("header").appendChild(errorMsg);
            //         // Remove the error message after 3 seconds
            //         setTimeout(() => errorMsg.remove(), 3000);
            //     }
            // }
        }
    });
}

function toggleTemperatureUnits() {
    const toggleButton = document.getElementById('temperature-toggle');
    toggleButton.addEventListener('click', async () => {
        isCelsius = !isCelsius;
        // Just need to update the values shown in the card with f_temperature
        updateWeatherCardTemp(isCelsius);
        updateForecastCardsTemp(isCelsius);
        changeToggleIcon(isCelsius);
    });
}

function toggleTheme() {
    // const themeIcon = document.getElementById("theme-icon");
    // themeIcon.addEventListener("click", () => {
    //     document.body.classList.toggle("dark-theme");
    // });
}

export { handleCitySearch, toggleTemperatureUnits, toggleTheme };
