let apiKey = "e89e31a1e21f0e5098fdecba081e5d67";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=${apiKey}&units=imperial`;

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
axios.get(apiUrl).then(getTemp);
