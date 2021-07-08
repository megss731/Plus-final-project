function getTemp(response) {
  let mainTemp = document.querySelector("#temperature-main");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  let mainCity = document.querySelector("#city");
  mainCity.innerHTML = response.data.name;
  let mainDescription = document.querySelector("#conditions");
  mainDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = getDayAndTime(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", "response.data.weather[0].main");
  farenheitTemp = response.data.main.temp;
}
function getDayAndTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
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
  return `${day}, ${hours}:${minutes}`;
}
function searchForCity(city) {
  let apiKey = "e89e31a1e21f0e5098fdecba081e5d67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemp);
}
function getCityInput(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  searchForCity(inputCity.value);
}

function displayTempCelsius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureMain = document.querySelector("#temperature-main");
  let celsiusTemp = (farenheitTemp - 32) / 1.8;
  temperatureMain.innerHTML = Math.round(celsiusTemp);
}
function displayTempFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureMain = document.querySelector("#temperature-main");
  temperatureMain.innerHTML = Math.round(farenheitTemp);
}
function displayForecast() {
  let futureForecast = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="week-day">${day}</div>
              <div class="future-icon">
                <img src="http://openweathermap.org/img/wn/04d@2x.png" width=50 alt="future forecast"/>
              </div>
              <div class="high-low-temps">
                <span class="high-temp">
                  90°
                </span>
                <span class="low-temp">
                  40°
                </span>
              </div>
            </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  futureForecast.innerHTML = forecastHTML;
}
let farenheitTemp = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", getCityInput);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayTempCelsius);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayTempFarenheit);

searchForCity("New York");
displayForecast();
// 3:15 into video starts explaining how to make the search box work
