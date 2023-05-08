const btn = document.querySelector(".btn");
const wrapper = document.querySelector(".wrapper");
const content = document.querySelector(".content");

const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  keyApi: "502e916a48c1ac0d0e84a324b8137df2",
  cityName: "",
};

async function getWeather() {
  try {
    const input = document.querySelector(".city__name").value;
    let city = input
      .trim()
      .toLowerCase()
      .replace(input[0], input[0].toUpperCase());

    const request = await fetch(
      `${param.url}weather?q=${city}&units=metric&APPID=${param.keyApi}`
    );
    const result = await request.json();

    const formattedDate = new Date(result.dt * 1000);
    const date =
      formattedDate.getDate() +
      "." +
      (formattedDate.getMonth() + 1) +
      "." +
      formattedDate.getFullYear() +
      " ";
    const time = formattedDate.getHours() + ":" + formattedDate.getMinutes();
    const weather = document.createElement("div");
    weather.classList.add("weather");
    weather.innerHTML = `      
  <div class="weather__name">Weather in city ${city}</div>
  <div class="weather__country">County - ${result.sys.country}</div>
  <div class="weather__temp">Temperature in ${city} : ${Math.round(
      result.main.temp
    )}</div>
  <div class="weather__temp-feelling">Temperature feels like : ${Math.round(
    result.main.feels_like
  )}</div>
  <img class="weather__img" src="" alt="" />
  <div class="weather__date">${city} date : ${date}</div>
  <div class="weather__time">Time in ${city} : ${time}</div>
`;
    content.append(weather);

    if (result.weather[0].main === "Clear") {
      const img = document.querySelector(".weather__img");
      img.src = "img/clear.png";
    }
    if (result.weather[0].main === "Rain") {
      const img = document.querySelector(".weather__img");
      img.src = "img/rain.png";
    }
    if (result.weather[0].main === "Clouds") {
      const img = document.querySelector(".weather__img");
      img.src = "img/cloud.png";
    }
    if (result.weather[0].main === "Snow") {
      const img = document.querySelector(".weather__img");
      img.src = "img/snow.png";
    }
    if (result.weather[0].main === "Drizzle") {
      const img = document.querySelector(".weather__img");
      img.src = "img/drizzle.png";
    }
    if (result.weather[0].main === "Thunderstorm") {
      const img = document.querySelector(".weather__img");
      img.src = "img/storm.png";
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = "This city not found, pls enter correct city";
    content.append(error);
  }
}
function clearInput() {
  const input = (document.querySelector(".city__name").value = "");
}
function clearContent() {
  const childContent = content.childNodes;
  for (let i = childContent.length - 1; i >= 0; i--) {
    if (childContent[i].nodeType === Node.ELEMENT_NODE) {
      content.removeChild(childContent[i]);
    }
    return;
  }
}
btn.addEventListener("click", clearContent);
btn.addEventListener("click", getWeather);
btn.addEventListener("click", clearInput);
wrapper.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    clearContent();
    getWeather();
    clearInput();
  }
});
