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
  
  // Weather code mapping to text descriptions
  const weatherDescriptions = {
    0: 'Clear',     // Clear sky
    1: 'Mostly Clear',     // Mainly clear
    2: 'Partly Cloudy',     // Partly cloudy
    3: 'Overcast',     // Overcast
    45: 'Foggy',    // Fog
    48: 'Foggy',    // Depositing rime fog
    51: 'Light Drizzle',    // Light drizzle
    53: 'Drizzle',    // Moderate drizzle
    55: 'Heavy Drizzle',    // Dense drizzle
    61: 'Light Rain',    // Slight rain
    63: 'Rain',    // Moderate rain
    65: 'Heavy Rain',    // Heavy rain
    71: 'Light Snow',    // Slight snow
    73: 'Snow',    // Moderate snow
    75: 'Heavy Snow',    // Heavy snow
    77: 'Snow',    // Snow grains
    80: 'Rain Showers',    // Slight rain showers
    81: 'Heavy Showers',    // Moderate rain showers
    82: 'Violent Showers',    // Violent rain showers
    85: 'Snow Showers',    // Slight snow showers
    86: 'Heavy Snow',    // Heavy snow showers
    95: 'Thunderstorm',    // Thunderstorm
    96: 'Thunderstorm',    // Thunderstorm with slight hail
    99: 'Severe Storm'     // Thunderstorm with heavy hail
  };
  
  // Update each icon with weather-related information
  if (icons.length >= 4) {
    // Primary weather condition
    icons[0].textContent = weatherDescriptions[weather_code] || 'Clear';
    icons[0].title = `Current weather in St. Louis`;
    
    // Temperature indicator
    if (temperature_2m > 80) {
      icons[1].textContent = 'Hot'; // Hot
    } else if (temperature_2m > 60) {
      icons[1].textContent = 'Mild'; // Mild
    } else if (temperature_2m > 32) {
      icons[1].textContent = 'Cool'; // Cool
    } else {
      icons[1].textContent = 'Freezing'; // Freezing
    }
    icons[1].title = `${Math.round(temperature_2m)}°F`;
    
    // Wind indicator
    if (wind_speed_10m > 15) {
      icons[2].textContent = 'Windy'; // Windy
    } else if (wind_speed_10m > 5) {
      icons[2].textContent = 'Breezy'; // Breezy
    } else {
      icons[2].textContent = 'Calm'; // Calm
    }
    icons[2].title = `Wind: ${Math.round(wind_speed_10m)} mph`;
    
    // Time of day indicator
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      icons[3].textContent = 'Day'; // Day
    } else {
      icons[3].textContent = 'Night'; // Night
    }
    icons[3].title = `Current time in St. Louis`;
  }
}

// Navigate to journal page
function openJournal() {
  window.location.href = 'journal.html';
}

// Call functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayCurrentDate();
  fetchWeather();
  
  // Add click event to journal icon
  const journalIcon = document.getElementById('journal-icon');
  if (journalIcon) {
    journalIcon.addEventListener('click', openJournal);
    journalIcon.style.cursor = 'pointer';
  }
});