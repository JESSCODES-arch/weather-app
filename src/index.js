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

  return `${day}, ${month} ${number}`;
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
//Fahrenheit Link
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
//Celsius Link
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 10;
}
//Current Location + temperature - Function in function in function (3*)
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let messageTemperature = document.querySelector("#temperature");
  let messageCity = document.querySelector("#submitted-city");
  messageTemperature.innerHTML = `${temperature}`;
  messageCity.innerHTML = `${city}`;
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
}
function receiveCity(event) {
  event.preventDefault();
  let apiKey = "2d89424c30d32683710090e6c247a224";
  let city = document.querySelector("#chosen-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//Get current weekday and date
let currentTime = new Date();
let nowDate = document.querySelector("#now-date");
nowDate.innerHTML = getDate(currentTime);

//Get current time
let nowTime = document.querySelector("#now-time");
nowTime.innerHTML = getTime(currentTime);

//Fahrenheit Link
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Celsius Link
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Current Location + temperature - Function in function in function (3*)
let buttonCurrent = document.querySelector("#current-position");
buttonCurrent.addEventListener("click", getPosition);

//Get temperature of submitted City
let chosenCity = document.querySelector("#search-form");
chosenCity.addEventListener("submit", receiveCity);
