// Your JavaScript code here
    // Function to fetch weather data
    async function getWeatherData(city) {
        const apiKey = 'fc78372dbee477b070923631acbab501';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        try {
            const response = await fetch(url);
            console.log(response); // Log the response object
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'City not found');
            }
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            alert(error.message);
        }
    }
    
    
        // Function to display weather data
        function displayWeatherData(data) {
            const cityElement = document.querySelector('.weather_city');
            const dateElement = document.querySelector('.weather_date_time');
            const forecastElement = document.querySelector('.weather_forecast');
            const iconElement = document.querySelector('.weather_icon_img');
            const iconDescElement = document.querySelector('.weather_icon_desc');
            const temperatureElement = document.querySelector('.weather_temperature');
            const minElement = document.querySelector('.weather_min');
            const maxElement = document.querySelector('.weather_max');
            const feelsLikeElement = document.querySelector('.weather_feels_like');
            const humidityElement = document.querySelector('.weather_humidity_value');
            const windElement = document.querySelector('.weather_wind_value');
            const pressureElement = document.querySelector('.weather_pressure');
    
            // Update elements with fetched data
            cityElement.textContent = `${data.name}, ${data.sys.country}`;
            dateElement.textContent = new Date().toLocaleString();
            forecastElement.textContent = data.weather[0].main;
            iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            iconDescElement.textContent = data.weather[0].description;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            minElement.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
            maxElement.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
            feelsLikeElement.innerHTML = `${Math.round(data.main.feels_like)}&#176;`;
            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${data.wind.speed} m/s`;
            pressureElement.textContent = `${data.main.pressure} hPa`;
        }
    
        // Handle form submission
        document.querySelector('.weather_search').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            const cityInput = document.querySelector('#city_input').value;
            if (cityInput) {
                getWeatherData(cityInput);
            }
        });