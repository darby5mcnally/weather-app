function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours > 12) {
    hours = hours - 12;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = 
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
        <img 
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt=""
          width="52"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">
            <b> ${
              Math.round(forecastDay.temp.max)
            }°</b>
          </span> | 
          <span class="weather-forecast-temperature-min">
            ${
              Math.round(forecastDay.temp.min)
            }°
          </span>
        </div>
      </div>
  `;
    }
  });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Challenge 1 geolocation
function cityForm(event) {
  event.preventDefault();
  let cityTextEntry = document.querySelector("#city-text-entry");
  let changingCity = document.querySelector("#changing-city");
  changingCity.innerHTML = `${cityTextEntry.value}`;
  search(cityTextEntry.value);
}

function search(city) {
  let apiKey = "abba93708591ea289439caf0b26bbc06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "abba93708591ea289439caf0b26bbc06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);

}

function showTemperature(response) {
  let changingCity = document.querySelector("#changing-city");
  let temperatureMetric = document.querySelector("#temperature-metric");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = (response.data.main.temp);

  changingCity.innerHTML = response.data.name;
  temperatureMetric.innerHTML = Math.round(celciusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed /1.609);
  dateElement.innerHTML = formatDate(response.data.dt *1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].description);

    getForecast(response.data.coord);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", cityForm);

function showWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "abba93708591ea289439caf0b26bbc06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Salt Lake City");
