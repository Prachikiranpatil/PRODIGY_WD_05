const apiKey = '4b88b5cac2c3e557cb3d85e99a175919';

function fetchWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            })
            .then(data => displayWeather(data))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Location not found');
            });
    } else {
        alert('Please enter a location');
    }
}

function displayWeather(data) {
    document.getElementById('location').innerText = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

// Optional: Get user's location and fetch weather data
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Uncomment the following line to automatically fetch weather data based on user's location when the page loads
// window.onload = getUserLocation;
