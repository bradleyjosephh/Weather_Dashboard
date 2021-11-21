var cityname = document.getElementById("cityname")
var cityBtn = document.getElementById("cityBtn")
var apiID = "6a3005c7b36bce0175f1efa2abab187c"
cityBtn.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("On click")
    var citySearch = cityname.value
    console.log(citySearch)
})

function currentWeather(cityname) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiID}`
    
}