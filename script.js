var cityname = document.getElementById("cityname")
var cityBtn = document.getElementById("cityBtn")
var apiID = "6a3005c7b36bce0175f1efa2abab187c"
// search event occurs
cityBtn.addEventListener("click", function (event) {
    event.preventDefault()
    console.log("On click")
    var citySearch = cityname.value
    console.log(citySearch)
    currentWeather(citySearch)
})
// current weather api call
function currentWeather(cityname) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiID}&units=imperial`
    fetch(apiURL)
        .then(function (data) {
            return data.json()
        }).then(function (result) {
            console.log(result)
            var lat = result.coord.lat
            var lon = result.coord.lon
            var previousSearch = JSON.parse(localStorage.getItem("weatherapi")) || []
            if(previousSearch.indexOf(cityname) === -1){
            previousSearch.push(cityname)
            localStorage.setItem("weatherapi", JSON.stringify(previousSearch))
            displayLocal()
            }
            var htmlText = `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${cityname}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Weather: ${result.main.temp}℉<span><img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png"></span></li>
          <li class="list-group-item">Description: ${result.weather[0].description}</li>
          <li class="list-group-item">Humidity: ${result.main.humidity}%</li>
          <li class="list-group-item">Windspeed: ${result.wind.speed} mph</li>
        </ul>
      </div>`

            document.querySelector(".weather-container").innerHTML = htmlText

            // 8 day forecast API call with lat lon
            var onecallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiID}&units=imperial`
            fetch(onecallApi)
                .then(function (data) {
                    return data.json()
                }).then(function (result) {
                    console.log(result)
                    var daily = result.daily
                    var htmlCode = ""
                    for (let i =0; i < daily.length ; i++) {
                        htmlCode += `<div class="card" style="width: 18rem;">
                        <h5 class="card-title">Day${i+1}</h5>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Weather: ${daily[i].temp.day}℉<span><img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png"></span></li>
                          <li class="list-group-item">Description: ${daily[i].weather[0].description}</li>
                          <li class="list-group-item">Humidity: ${daily[i].humidity}%</li>
                          <li class="list-group-item">Windspeed: ${daily[i].wind_speed} mph</li>
                          <li class="list-group-item">UV-Index: ${daily[i].uvi}</li>
                        </ul>
                      </div>`
                      
                    }
                    document.querySelector(".container-fiveForecast").innerHTML = htmlCode
                })
        })
    }

    function displayLocal (){ //hoisting
       
    let lastCity = JSON.parse(localStorage.getItem("weatherapi")) || []
    let cityPage = "<h3>Previous Search</h3>"
    for (let i=0;i<lastCity.length;i++ ){
        cityPage += `<li><button class="cityPage btn btn-secondary">${lastCity[i]}</button></li>`
        console.log(cityPage)
    }
    document.querySelector(".lastSearch").innerHTML = cityPage
    console.log(lastCity)


    }

    displayLocal()