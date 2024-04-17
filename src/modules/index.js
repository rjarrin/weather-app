import '../style.css';
import generateHeader from './dom';
import { fetchForecastData } from './api';

generateHeader();

console.log(`index.js - fetchForecastData:`);
console.log(fetchForecastData("Toronto"));