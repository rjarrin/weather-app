import '../style.css';
import { generateHeader, generateBodyContainer } from './dom';
import { handleCitySearch, toggleTemperatureUnits, toggleTheme } from './ui';

// Generate HTML elements and event listeners associated with the header container
generateHeader();
// Generate HTML elements and event listeners associated with the body container
generateBodyContainer("Toronto");
handleCitySearch();
toggleTemperatureUnits();
toggleTheme();