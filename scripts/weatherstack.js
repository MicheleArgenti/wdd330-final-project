const API_KEY = 'c53176d65ed68f5a0b579120439ca9e9';
const BASE_URL = 'http://api.weatherstack.com/current'
const options = {
	method: 'GET'
};

'https://api.weatherstack.com/current?access_key=c53176d65ed68f5a0b579120439ca9e9&query=Rome'

export async function fetchWeatherImages(location) {
    const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${location}`, options);
    const data = await response.json();
    return data.current.weather_icons; // Returns image URL
}