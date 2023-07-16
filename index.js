// Your code here

//Starting vars
var weatherDiv = document.getElementById('weather')
var form = document.querySelector('form')
var userInput = document.getElementById('weather-search')

//Gather and display data on submit
form.onsubmit = function(e) {
    e.preventDefault()
    //Create URL
    var apiKey = '70e77c9d7cf93a8a29161c4bf87d7c45'
    var locationName = this.search.value.trim()
    if (!locationName) return
    var URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + locationName + '&units=imperial&APPID=' + apiKey
    //Clear search field
    userInput.value = ''
    //Fetch data
    fetch(URL)
    .then(function(res) {
        return res.json()
    })
    //Log weather
    .then(function(weather) {
        console.log(weather)
        //Display city name
        weatherDiv.innerHTML = "" 
        var cityName = document.createElement('h2')
        cityName.textContent = weather.name + ", " + weather.sys.country
        weatherDiv.appendChild(cityName)
        //Display map link
        var mapLink = document.createElement('a')
        var lat = weather.coord.lat
        var lon = weather.coord.lon
        var googleMap = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
        weatherDiv.appendChild(mapLink)
        mapLink.textContent = "Click to view map"
        mapLink.href = googleMap
        mapLink.target = "_BLANK"
        //Display icon
        var weatherIcon = document.createElement('img')
        var icon = weather.weather[0].icon
        weatherIcon.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
        weatherDiv.appendChild(weatherIcon)
        //Display condition
        var condition = document.createElement('p')
        var description = weather.weather[0].description
        var firstLetter = description.charAt(0)
        var firstLetterCap = firstLetter.toUpperCase()
        var remainingLetters = description.slice(1)
        condition.textContent = firstLetterCap + remainingLetters
        weatherDiv.appendChild(condition)
        var enter = document.createElement('br')
        weatherDiv.appendChild(enter)
        //Display current temp
        var currentTemp = document.createElement('p')
        currentTemp.textContent = "Current: " + weather.main.temp + "\xB0 F"
        weatherDiv.appendChild(currentTemp)
        //Display feels like temp
        var feelsLike = document.createElement('p')
        feelsLike.textContent = "Feels like: " + weather.main.feels_like + "\xB0 F"
        weatherDiv.appendChild(feelsLike)
        var enter = document.createElement('br')
        weatherDiv.appendChild(enter)
        //Display updated time
        var updatedTime = document.createElement('p')
        var day = new Date(weather.dt * 1000)
        var time = day.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        updatedTime.textContent = 'Last updated: ' + time
        weatherDiv.appendChild(updatedTime)
    })
    //Display locaiton not found
    .catch(function(err) {
        var error = document.createElement('h2')
        weatherDiv.appendChild(error)
        error.textContent = "Location Not Found"
    })
}