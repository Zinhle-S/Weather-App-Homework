function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed")
  let currentDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let currentTemperatureIconElement = document.querySelector(
    "#current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  currentDateElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  currentTemperatureIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
   let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  
  searchCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
      if (index <5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="full-weather-forecast">
       <div class="weather-forecast-day">${formatDay(day.time)}</div>
       <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
      `;
      }
    });


    let forecastElement = document.querySelector("#forecast")
    forecastElement.innerHTML = forecastHtml
 }

    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", searchSubmit);

    searchCity("Johannesburg");

