// Import dependencies and modules
import logoImage from '../images/weather-app-logo.png';
import searchIcon from '../images/magnify.svg';
import themeIcon from '../images/theme-light-dark.svg';
import temp from '../images/tempimage.jpg';
import celsius from '../images/temperature-celsius.svg';
import fahrenheit from '../images/temperature-fahrenheit.svg';

const mockWeatherData = [
    { day: 'Today', condition: 'Sunny', temperature: '20°C' },
    { day: 'Tomorrow', condition: 'Raining', temperature: '9°C' },
    { day: 'Overmorrow', condition: 'Snowing', temperature: '-10°C' },
];

function updateCity() {
    // TODO: Return city based on the searched result

    // Return default value
    return 'Toronto';
}

export function generateWeatherCards() {
    console.log('generateWeather Implemented');
    // Get the container element
    const container = document.getElementById('container');
    container.style.border = '1px solid red';

    // Loop through the weather data and create a card for each day
    mockWeatherData.forEach((day) => {
        // Create the card container
        const card = document.createElement('div');
        card.classList.add('weather-card');
        card.style.border = '1px solid blue';
        // Create the weather confition image
        const img = document.createElement('img');
        img.src = temp;
        img.alt = day.condition;
        // Create the weather condition text
        const status = document.createElement('p');
        status.textContent = `${day.condition}`;
        // Create the temperature text
        const temperature = document.createElement('p');
        temperature.textContent = `${day.temperature}`;
        // Append the card elements to the card
        card.appendChild(img);
        card.appendChild(status);
        card.appendChild(temperature);
        // Append the card to the container
        container.appendChild(card);
    });
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
