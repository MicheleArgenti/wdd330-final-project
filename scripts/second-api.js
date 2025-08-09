const UNSPLASH_KEY = 'your-api-key';

export async function fetchWeatherImages(weatherCondition) {
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${weatherCondition}&client_id=${UNSPLASH_KEY}`
    );
    const data = await response.json();
    return data.results[0].urls.regular; // Returns image URL
}