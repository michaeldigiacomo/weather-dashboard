var weatherInput = document.getElementById("weatherInput");
var searchButton = document.getElementById("searchButton");
var cityNameEl = document.getElementById("cityName");
var temperatureEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windSpeedEl = document.getElementById("windSpeed");


searchButton.addEventListener("click", function() {
    var cityName = weatherInput.value;
    save(cityName);
    searchweather(cityName);
    searchFiveDay(cityName);
});

function save(newCity) {
    var allCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    allCities.push(newCity);
    localStorage.setItem("savedCities", JSON.stringify(allCities));
}

function searchweather(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=784e96f1b18fe22b3847fa6ed87bd2bc")
    .then(function(response){
        return response.json();
    }).then(function(weather){
        console.log(weather);
        console.log(weather.name);
        console.log("Temperature " + weather.main.temp);
        console.log("humidity " + weather.main.humidity);
        console.log("wind speed " + weather.wind.speed + "mph");
        var city = weather.name;
        var temp = convertKelvin(weather.main.temp);
        var hum = weather.main.humidity;
        var wind = weather.wind.speed;
        cityNameEl.textContent = city;
        temperatureEl.textContent = temp;
        humidityEl.textContent = hum;
        windSpeedEl.textContent = wind;
    })
}

function searchFiveDay(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=784e96f1b18fe22b3847fa6ed87bd2bc")
    .then(function(response){
        return response.json();
    }).then(function(weather){
        console.log(weather);
        var weatherArray = weather.list;
        for (var i = 0; i < weatherArray.length; i++) {
            if(weatherArray[i].dt_txt.endsWith("12:00:00")) {
            console.log(weatherArray[i].dt_txt);
            console.log(convertKelvin(weatherArray[i].main.temp));
            console.log(weatherArray[i].main.humidity);
            }
        }
    })
}

function convertKelvin (kelvin) {
    return parseInt((kelvin - 273.15) * 1.8 + 32);
  }