import { fetchWeather } from './weather-api.js';
import { fetchWeatherImages } from './weatherstack.js';

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // This MUST be the first line
    
    const location = document.getElementById('location-input').value.trim();
    if (!location) return; // Don't proceed if empty
    
    if (!location) return; // Skip empty submissions

    const weatherDisplay = document.getElementById('weather-display');
    
    try {
        // Show loading state
        weatherDisplay.innerHTML = '<div class="spinner"></div>';
        
        // Fetch data from APIs
        const weatherData = await fetchWeather(location);
        const imageUrl = await fetchWeatherImages(location);
        
        // Render results
        renderWeather(weatherData);
        renderImages(imageUrl);
        
    } catch (error) {
        weatherDisplay.innerHTML = `
            <div class="error">
                <p>Failed to load weather data. Please try again.</p>
                <small>${error.message}</small>
            </div>
        `;
        console.error('API Error:', error);
    }
});

function renderWeather(data) {
    document.getElementById('weather-display').innerHTML = `
        <div class="weather-card">
            <h2>${data.location.name}</h2>
            <p>${data.current.temp_c}°C, ${data.current.condition.text}</p>
            <div class="weather-icon-container"></div>
        </div>
    `;
    data.forecast.forecastday[0].hour.forEach(time => {
        console.log(time.time);
        let div = document.createElement('div');
        div.classList.add('weather-card');
        div.innerHTML = `
            <h3>${time.time}</h3>
            <p>${time.temp_c}</p>
        `;
        document.getElementById('weather-display').appendChild(div);
    });
}

function renderImages(imgUrl) {
    const iconContainer = document.querySelector('.weather-icon-container');
    if (!iconContainer) return; // Safety check
    
    iconContainer.innerHTML = ''; // Clear previous icon
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Weather condition icon';
    img.loading = 'lazy';
    iconContainer.appendChild(img);
}

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location-input').value.trim();
    if (!location) return;

    const weatherDisplay = document.getElementById('weather-display');
    
    try {
        // Show loading spinner
        weatherDisplay.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <p>Fetching weather data...</p>
            </div>
        `;
        
        // Create a minimum 5-second delay
        const delay = new Promise(resolve => setTimeout(resolve, 5000));
        
        // Fetch data while waiting
        const [weatherData, imageUrl] = await Promise.all([
            fetchWeather(location),
            fetchWeatherImages(location),
            delay // This ensures minimum 5s wait
        ]);
        
        // Render results after delay
        renderWeather(weatherData);
        renderImages(imageUrl);
        
    } catch (error) {
        weatherDisplay.innerHTML = `
            <div class="error">
                <p>Failed to load weather data. Please try again.</p>
                <small>${error.message}</small>
            </div>
        `;
    }
});