const API_KEY = '2fa521d711824a7fb95160517250908';
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export async function fetchWeather(location) {
    console.log(`${BASE_URL}?key=${API_KEY}&q=${location}`);
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}`);
    const data = await response.json();
    console.log(data);
    return data;
    return {
        city: data.location.name,
        temp: data.current.temp_c,
        condition: data.current.condition.text
    };
}