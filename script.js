var cityname = document.getElementById("cityname")
var cityBtn = document.getElementById("cityBtn")
var apiID = "6a3005c7b36bce0175f1efa2abab187c"
cityBtn.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("On click")
    var citySearch = cityname.value
    console.log(citySearch)
    currentWeather(citySearch)
})

function currentWeather(cityname) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiID}&units=imperial`
    fetch(apiURL)
    .then(function(data){
        return data.json()
    }) .then(function(result){
        console.log(result)
        var htmlText = `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${cityname}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Weather: ${result.main.temp}<span><img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png"></span></li>
          <li class="list-group-item">Description: ${result.weather[0].description}</li>
          <li class="list-group-item">Humidity: ${result.main.humidity}</li>
          <li class="list-group-item">Windspeed: ${result.wind.speed}</li>
        </ul>
      </div>`

      document.querySelector(".weather-container").innerHTML = htmlText

    })
}
