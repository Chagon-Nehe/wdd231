const myCity = document.querySelector("#city");
const myimage = document.querySelector("#icon");
const mydescription = document.querySelector("#description");
const mytemp = document.querySelector("#temperature");


//decraring my variables
const lat =  "-13.954520692818173"
const long=   "33.78844115229538"
const key = "6f7627c327e3e17f37c4c201b3c13eb1"

//fetching the weather data
const getWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;

async function apiFetch() {
  try {
    const response = await fetch(getWeatherURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); 
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

//declaring the function to display the results
function displayResults(data){
    //console.log('hello');
    myCity.textContent = data.name;
    mydescription.textContent = data.weather[0].description;
    mytemp.textContent = Math.round(data.main.temp) + "°C";
    myimage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myimage.setAttribute('src', myimage.src)
    myimage.loading = "lazy"; // For better performance
    myimage.setAttribute('alt', data.weather[0].description);
}    
apiFetch();
const WEATHER_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${key}`; // 5-day / 3-hour forecast
// Function to fetch and display 3-day forecast
async function getThreeDayForecast() {
    const forecastDisplayDiv = document.getElementById('forecast-display');
    if (!forecastDisplayDiv) {
        console.error("Element with ID 'forecast-display' not found.");
        return;
    }

    try {
        const response = await fetch(WEATHER_URL_FORECAST);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // OpenWeatherMap's 'forecast' API provides 5-day / 3-hour data.
        // We need to extract one entry per day for a 3-day forecast.
        const dailyForecasts = [];
        const uniqueDates = new Set();
        
        // Loop through the forecast list and get one entry per day
        // We'll target around noon (12:00) for representative daily temps.
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000); // Convert Unix timestamp to Date object
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const hour = date.getHours();

            // Select one entry per day, ideally around midday for temp representation
            // We'll grab the first entry for each unique date, or an entry close to 12:00
            if (!uniqueDates.has(day) && hour >= 10 && hour <= 14) { // Check for unique date and hours around noon
                dailyForecasts.push(item);
                uniqueDates.add(day);
            }
            if (dailyForecasts.length >= 3) return; // Stop after getting 3 days
        });

        // Fallback: If we didn't get 3 days from the noon filter, just take the first 3 unique days
        if (dailyForecasts.length < 3) {
            dailyForecasts.length = 0; // Clear previous and re-populate
            uniqueDates.clear();
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                if (!uniqueDates.has(day)) {
                    dailyForecasts.push(item);
                    uniqueDates.add(day);
                }
                if (dailyForecasts.length >= 3) return;
            });
        }


        let forecastHTML = '';
        for (let i = 0; i < Math.min(3, dailyForecasts.length); i++) {
            const forecast = dailyForecasts[i];
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = forecast.main.temp.toFixed(1);
            const description = forecast.weather[0].description;
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            forecastHTML += `
                <div class="forecast-day-card">
                    <p><strong>${dayName}</strong></p>
                    <p>Temp: ${temp}&deg;C</p>
                    <p>${description.charAt(0).toUpperCase() + description.slice(1)} <img src="${iconUrl}" alt="${description}"></p>
                </div>
            `;
        }
        forecastDisplayDiv.innerHTML = forecastHTML;

    } catch (error) {
        console.error('Could not fetch 3-day forecast:', error);
        forecastDisplayDiv.innerHTML = '<p>Failed to load forecast data.</p>';
    }
}
// Call the function to fetch and display the 3-day forecast
document.addEventListener('DOMContentLoaded', () => {
    getThreeDayForecast();
});

