var weatherInput = document.getElementById("weatherInput");
var searchButton = document.getElementById("searchButton");
var cityNameEl = document.getElementById("cityName");
var temperatureEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windSpeedEl = document.getElementById("windSpeed");


searchButton.addEventListener("click", function() {
    var cityName = weatherInput.value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=784e96f1b18fe22b3847fa6ed87bd2bc")
    .then(function(response){
        return response.json();
    }).then(function(weather){
        // console.log(weather);
        // console.log(weather.name);
        // console.log("Temperature " + weather.main.temp);
        // console.log("humidity " + weather.main.humidity);
        // console.log("wind speed " + weather.wind.speed + "mph");
        var city = weather.name;
        var temp = weather.main.temp;
        var hum = weather.main.humidity;
        var wind = weather.wind.speed;
        cityNameEl.textContent = city;
        temperatureEl.textContent = temp;
        humidityEl.textContent = hum;
        windSpeedEl.textContent = wind;
    })
});