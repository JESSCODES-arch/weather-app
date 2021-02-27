//Function variables:
//Get current weekday and date
function getDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
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
    "December",
  ];
  let month = months[date.getMonth()];
  let number = date.getDate();
  if (number === 1 || number === 21 || number === 31) {
    return `${day}, ${month} ${number}st`;
  }
  if (number === 2 || number === 22) {
    return `${day}, ${month} ${number}nd`;
  }
  if (number === 3 || number === 23) {
    return `${day}, ${month} ${number}rd`;
  } else {
    return `${day}, ${month} ${number}th`;
  }
}
//Get current time
function getTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute} h`;
}
//Get forecast time
function formatHours(timestamp) {
  let currentTime = new Date(timestamp);
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
    return `${hour}:${minute}`;
  }
}

//Current Location + temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let messageTemperature = document.querySelector("#temperature");
  let messageCity = document.querySelector("#submitted-city");
  messageTemperature.innerHTML = `${temperature}`;
  messageCity.innerHTML = `${city}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].icon);
  celsiusTemperatur = response.data.main.temp;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2d89424c30d32683710090e6c247a224";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//Get temperature of submitted City
function displayWeatherCondition(response) {
  document.querySelector("#submitted-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].icon);
  celsiusTemperature = response.data.main.temp;
}
//Fahrenheit Link
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
//Celsius Link
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//API call for default city and city input
function receiveCity(event) {
  event.preventDefault();
  let city = document.querySelector("#chosen-city").value;
  searchCity(city);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 12; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="col-2">
              <div class="card" style="width: 90px">
                <div class="card-body">
                  <div class="forecast-times">${formatHours(
                    forecast.dt * 1000
                  )}</div>
                  <img src="https://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" class="forecast-icon" />
                  <div class="forecast-range">Low:</div>
                  <div class="forecast-low-high" id="forecast-low">${Math.round(
                    forecast.main.temp_min
                  )}°C</div>
                  <div class="forecast-range">High:</div>
                  <div class="forecast-low-high" id="forecast-high">${Math.round(
                    forecast.main.temp_max
                  )}°C</div>
                </div>
              </div>
            </div>`;
  }
}
function searchCity(city) {
  let apiKey = "2d89424c30d32683710090e6c247a224";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
//Global variables:
//Get current weekday and date
let currentTime = new Date();
let nowDate = document.querySelector("#now-date");
nowDate.innerHTML = getDate(currentTime);

//Get current time
let nowTime = document.querySelector("#now-time");
nowTime.innerHTML = getTime(currentTime);

//Current Location + temperature - Function in function in function (3*)
let buttonCurrent = document.querySelector("#current-position");
buttonCurrent.addEventListener("click", getPosition);

//Get temperature of submitted City
let chosenCity = document.querySelector("#search-form");
chosenCity.addEventListener("submit", receiveCity);

//Fahrenheit Link
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Celsius Link
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

//Default city
searchCity("tobermore");
