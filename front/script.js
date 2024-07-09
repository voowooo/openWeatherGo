var weatherDesc


async function fetchWeather() {
    try {
        const response = await fetch('http://localhost:8080/weather');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // document.getElementById('weather').innerText = 
        //     `Current temperature in ${data.name} is ${data.main.temp}°C, humidity ${data.main.humidity}%`;
        document.getElementById('city').innerHTML = data.name;
        var descriptionOBJ = data.weather[0];
        document.getElementById('description').innerHTML = descriptionOBJ.main;
        weatherDesc = descriptionOBJ.main;
        // weatherDesc = 'Smoke';
        document.getElementById('temp').innerHTML = data.main.temp + '°C';
        document.getElementById('feeling').innerHTML = data.main.feels_like + '°C';
        console.log(data.main);
        document.getElementById('wind').innerHTML = data.wind.speed + 'm/s'
                
        var mmHg = Math.round(0.75006375541921 * data.main.pressure);

        document.getElementById('pressure').innerHTML = mmHg + 'mmHg';
        document.getElementById('humid').innerHTML = data.main.humidity + '%';
        changeWeatherIcon()
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        // document.getElementById('weather').innerText = 'Error fetching weather data';
    }
}

fetchWeather();


var icon = document.getElementById('weatherIcon');

function changeWeatherIcon(){
    if(weatherDesc == 'Clouds'){
        icon.src = 'img/weather/cloudy.png';
    } else if(weatherDesc == 'Clear'){
        icon.src = 'img/weather/sunny.png';
    } else if(weatherDesc == 'Rain'){
        icon.src = 'img/weather/rainy.png';
    } else if(weatherDesc == 'Snow'){
        icon.src = 'img/weather/snowy.png';
    } else if(weatherDesc == 'Thunderstorm'){
        icon.src = 'img/weather/thunder.png';
    } else {
        icon.src = 'img/weather/error.png';
    }
}