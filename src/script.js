//Date, time, year
let now = new Date();

let p = document.querySelector("p");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

p.innerHTML = `${day}, ${month} ${date}, ${year} | ${hour}:${minutes}`;

//Change celcius to fahrenheit


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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

search("Salt Lake City");

function showTemperature(response) {
  let changingCity = document.querySelector("#changing-city");
  changingCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureMetric = document.querySelector("#temperature-metric");
  temperatureMetric.innerHTML = `${temperature}°`;
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", cityForm);

function showWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "abba93708591ea289439caf0b26bbc06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);