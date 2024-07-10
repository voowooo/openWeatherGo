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

function UserChooseCity(){
    var what = document.getElementById('inputCity').value;
    changeCity(what);
}

async function changeCity(what) {
    const response = await fetch('http://localhost:8080/setCity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ City: what })
    });

    console.log('resp' + response);

    if (response.ok) {
        // alert('Variable changed successfully');
    } else {
        // alert('Error changing variable');
    }
    upd();
}

// changeCity()

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

// function changeCity(){
//     console.log('change city');
// }

function openWIN(what){
    if (what == 'settings'){
        document.getElementById('settings').style.display = 'flex';
    } else {
        console.log('open error')
    }
}

function closeWIN(what){
    if (what == 'settings'){
        document.getElementById('settings').style.display = 'none';
    } else{
        console.log('close error')
    }
}

function showInfoItems(){
    var fellsLike = document.getElementById('fellsLikeCheck');
    var fellsLikeDiv = document.getElementById('feelingDiv');
    var pressure = document.getElementById('pressureCheck');
    var pressureDiv = document.getElementById('pressureDiv');
    var humid = document.getElementById('humidCheck');
    var humidDiv = document.getElementById('humidDiv');
    if (fellsLike.checked){
        fellsLikeDiv.style.display = 'flex';
    } else {
        fellsLikeDiv.style.display = 'none';
    }
    if (pressure.checked){
        pressureDiv.style.display = 'flex';
    } else {
        pressureDiv.style.display = 'none';
    }
    if (humid.checked){
        humidDiv.style.display = 'flex';
    } else {
        humidDiv.style.display = 'none';
    }
}

function upd(){
    location.reload();    
}