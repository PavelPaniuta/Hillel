const monthNames = [
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
const date = new Date();
const month = date.getMonth();
const day = date.getDay();
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const second = date.getSeconds();

const API = "4ca14256392a249927d598bb73c749b1";
const data = document.querySelector(".wather-data");
const time = document.querySelector(".wather-time");
const citys = document.querySelector(".wather-citys");
const humidity = document.querySelector(".wather-humidity");
const pressure = document.querySelector(".wather-pressure");
const wind = document.querySelector(".wather-wind");
const temperatur = document.querySelector(".wather-temperatur");
const feelsLike = document.querySelector(".wather-feelslike");
const reset = document.querySelector(".refresh-button");
const select = document.querySelector(".city");
const loading = document.querySelector(".loading");
let selectValue = "Kiev";

async function watherGetData(citi) {
  citys.textContent = "--";
  humidity.textContent = "--";
  pressure.textContent = "--";
  wind.textContent = "--";
  temperatur.textContent = "--";
  feelsLike.textContent = "--";
  temperatur.textContent = "--";
  loading.textContent = "Loading...";
  selectValue = citi;
  let watherPromis = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citi}&appid=${API}&units=metric`
  );
  const data = watherPromis.json();
  data.then((data) => {
    setTimeout(() => {
      citys.textContent = citi;
      loading.textContent = "";
      humidity.textContent = data.main.humidity;
      pressure.textContent = data.main.pressure;
      wind.textContent = data.wind.speed;
      temperatur.textContent = Math.floor(data.main.temp);
      feelsLike.textContent = Math.floor(data.main.feels_like);
      temperatur.textContent = Math.floor(data.main.temp);
    }, 1000);
  });
}

data.textContent = `${monthNames[month]}, ${day}, ${year}`;
time.textContent = `${hours}:${minutes}:${second}`;

function Time() {
  setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    time.textContent = formattedTime;
  }, 1000);
}
Time();

reset.addEventListener("click", () => watherGetData(selectValue));

select.addEventListener("change", function () {
  if (selectValue === this.value) {
    return;
  }
  selectValue = this.value;
  watherGetData(this.value);
});

reset.addEventListener('click', function () {
    reset.classList.add('animate');
    setTimeout ( () => {
        reset.classList.remove('animate');
    }, 1000)
});
