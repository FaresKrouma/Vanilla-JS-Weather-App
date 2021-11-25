const API = "https://www.metaweather.com/api/location/search/?query=";
const APIURL = "https://www.metaweather.com//api/location/";
const IMGAPI = "https://api.unsplash.com/search/photos?client_id=bwUoqP6ZjqazmA8j2875wglFxTLqH8jh0SzixCifCP8&query="

const cityName = document.getElementById("cityname")
const cityTemp = document.getElementById("temp")
const weatherState = document.getElementById("state")
const cityImage = document.getElementById("city-image")

const day1Name = document.getElementById("day1-name")
const day1Temp = document.getElementById("day1-temp")
const day1Img = document.getElementById("day1-img")
const day2Name = document.getElementById("day2-name")
const day2Temp = document.getElementById("day2-temp")
const day2Img = document.getElementById("day2-img")
const day3Name = document.getElementById("day3-name")
const day3Temp = document.getElementById("day3-temp")
const day3Img = document.getElementById("day3-img")
const day4Name = document.getElementById("day4-name")
const day4Temp= document.getElementById("day4-temp")
const day4Img = document.getElementById("day4-img")
const day5Name = document.getElementById("day5-name")
const day5Temp = document.getElementById("day5-temp")
const day5Img = document.getElementById("day5-img")

const input = document.getElementById("search")
const form = document.getElementById("form")

async function getCityPhoto(cityname) {
    const randomPage = Math.floor(Math.random() * 3)
    const resp = await fetch(IMGAPI + cityname + "&page=" + randomPage);
    const respData = await resp.json();
    const randomCityImage = respData.results[Math.floor(Math.random() * 10)].urls.small;
    cityImage.src = randomCityImage;  
    cityImage.classList.add("animation");
    setTimeout(() => {
        cityImage.classList.remove("animation")
    },1200)
}

// fetching weather details from api into page
function fetchWeatherDetails(weatherDetails) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    cityName.textContent = weatherDetails.title + ", " + weatherDetails.parent.title
    cityTemp.textContent = weatherDetails.consolidated_weather[0].the_temp.toFixed(1)
    weatherState.textContent = weatherDetails.consolidated_weather[0].weather_state_name
    
    day1Name.textContent = days[new Date(weatherDetails.consolidated_weather[1].applicable_date).getDay()]
    day1Temp.textContent = Math.round(weatherDetails.consolidated_weather[1].the_temp)
    day1Img.src = `https://www.metaweather.com/static/img/weather/png/64/${weatherDetails.consolidated_weather[1].weather_state_abbr}.png`
    
    day2Name.textContent = days[new Date(weatherDetails.consolidated_weather[2].applicable_date).getDay()]
    day2Temp.textContent = Math.round(weatherDetails.consolidated_weather[2].the_temp)
    day2Img.src = `https://www.metaweather.com/static/img/weather/png/64/${weatherDetails.consolidated_weather[2].weather_state_abbr}.png`
    
    day3Name.textContent = days[new Date(weatherDetails.consolidated_weather[3].applicable_date).getDay()]
    day3Temp.textContent = Math.round(weatherDetails.consolidated_weather[3].the_temp)
    day3Img.src = `https://www.metaweather.com/static/img/weather/png/64/${weatherDetails.consolidated_weather[3].weather_state_abbr}.png`
    
    day4Name.textContent = days[new Date(weatherDetails.consolidated_weather[4].applicable_date).getDay()]
    day4Temp.textContent = Math.round(weatherDetails.consolidated_weather[4].the_temp)
    day4Img.src = `https://www.metaweather.com/static/img/weather/png/64/${weatherDetails.consolidated_weather[4].weather_state_abbr}.png`
    
    day5Name.textContent = days[new Date(weatherDetails.consolidated_weather[5].applicable_date).getDay()]
    day5Temp.textContent = Math.round(weatherDetails.consolidated_weather[5].the_temp)
    day5Img.src = `https://www.metaweather.com/static/img/weather/png/64/${weatherDetails.consolidated_weather[5].weather_state_abbr}.png`   
}


async function getCityWeather(search) {
    const resp = await fetch(API + search)
    const resp2 = await resp.json()
    const cityCode = resp2[0].woeid
    const resp3 = await fetch(APIURL + cityCode)
    const respData = await resp3.json()
    console.log(respData)
    fetchWeatherDetails(respData)
}

form.addEventListener("submit", (e) => {
    const searchKey = input.value
    e.preventDefault();
    getCityWeather(searchKey); 
    getCityPhoto(searchKey);
    input.value = "";
})

getCityWeather("berlin")
getCityPhoto("berlin")