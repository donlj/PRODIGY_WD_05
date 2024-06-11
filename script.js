
const apiKey = 'dbd566adb6dae9759daa1ef74782cf6d';

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching the weather data:', error));
    } else {
        alert('Please enter a location.');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching the weather data:', error));
        }, error => {
            alert('Geolocation failed. Please enter a location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    document.getElementById('locationName').textContent = data.name;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
