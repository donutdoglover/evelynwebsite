// Display today's date
function displayCurrentDate() {
  const today = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);
  document.getElementById('current-date').textContent = formattedDate;
}

// Fetch weather data for St. Louis, MO
async function fetchWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.6270&longitude=-90.1994&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago');
    const data = await response.json();
    updateWeatherIcons(data.current);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Keep default icons if weather fetch fails
  }
}

// Update icons based on weather data
function updateWeatherIcons(weatherData) {
  const { temperature_2m, weather_code, wind_speed_10m } = weatherData;
  
  // Get icon elements
  const icons = document.querySelectorAll('.icon');
  
  // Weather code mapping to emojis
  const weatherEmojis = {
    0: '☀️',     // Clear sky
    1: '🌤️',     // Mainly clear
    2: '⛅',     // Partly cloudy
    3: '☁️',     // Overcast
    45: '🌫️',    // Fog
    48: '🌫️',    // Depositing rime fog
    51: '🌦️',    // Light drizzle
    53: '🌦️',    // Moderate drizzle
    55: '🌦️',    // Dense drizzle
    61: '🌧️',    // Slight rain
    63: '🌧️',    // Moderate rain
    65: '🌧️',    // Heavy rain
    71: '🌨️',    // Slight snow
    73: '🌨️',    // Moderate snow
    75: '❄️',    // Heavy snow
    77: '❄️',    // Snow grains
    80: '🌦️',    // Slight rain showers
    81: '🌧️',    // Moderate rain showers
    82: '⛈️',    // Violent rain showers
    85: '🌨️',    // Slight snow showers
    86: '❄️',    // Heavy snow showers
    95: '⛈️',    // Thunderstorm
    96: '⛈️',    // Thunderstorm with slight hail
    99: '⛈️'     // Thunderstorm with heavy hail
  };
  
  // Update each icon with weather-related information
  if (icons.length >= 4) {
    // Primary weather condition
    icons[0].textContent = weatherEmojis[weather_code] || '☀️';
    icons[0].title = `Current weather in St. Louis`;
    
    // Temperature indicator
    if (temperature_2m > 80) {
      icons[1].textContent = '🔥'; // Hot
    } else if (temperature_2m > 60) {
      icons[1].textContent = '🌡️'; // Mild
    } else if (temperature_2m > 32) {
      icons[1].textContent = '🧊'; // Cool
    } else {
      icons[1].textContent = '❄️'; // Freezing
    }
    icons[1].title = `${Math.round(temperature_2m)}°F`;
    
    // Wind indicator
    if (wind_speed_10m > 15) {
      icons[2].textContent = '💨'; // Windy
    } else if (wind_speed_10m > 5) {
      icons[2].textContent = '🍃'; // Breezy
    } else {
      icons[2].textContent = '🌬️'; // Calm
    }
    icons[2].title = `Wind: ${Math.round(wind_speed_10m)} mph`;
    
    // Time of day indicator
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      icons[3].textContent = '☀️'; // Day
    } else {
      icons[3].textContent = '🌙'; // Night
    }
    icons[3].title = `Current time in St. Louis`;
  }
}

// Call functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayCurrentDate();
  fetchWeather();
});