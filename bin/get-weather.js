#!/usr/bin/env node

const lib = require("../");
const getWeather = lib.cacheableRequest("get-weather", lib.getJSON, 5);

function icon(weather) {
  switch (weather.icon) {
    case "clear-day":
      // TODO: add sunrise/sunset 🌇 🌅
      // return "☀️";
      return "\uf185";
    case "clear-night":
      // return "🌙";
      return "\uf186";
    case "sleet":
      // return "🌨";
      return "\ufe3ad";
    case "rain":
      // return "☔";
      return "\ue318";
    case "snow":
      // return "❄️";
      return "\uf2dc";
    case "wind":
      // return "💨";
      return "\ue27e";
    case "fog":
      // return "🌁";
      return "fa90";
    case "cloudy":
      // return "☁️";
      return "\ue312";
    case "partly-cloudy-night":
      // return "☁️🌛";
      return "\ue319";
    case "partly-cloudy-day":
      // return "⛅️";
      return "\ue376";
    default:
      return weather.icon;
  }
}

function temperature(weather) {
  const tempC = Math.round(weather.temp_c * 10) / 10;
  const apparentTemperature = Math.round(weather.feelslike_c * 10) / 10;
  const tempF = Math.round(weather.temp_f * 10) / 10;

  let color = 255;
  if (tempF < 40) {
    color = 27;
  } else if (tempF < 50) {
    color = 39;
  } else if (tempF < 60) {
    color = 50;
  } else if (tempF < 70) {
    color = 220;
  } else if (tempF < 80) {
    color = 208;
  } else if (tempF < 90) {
    color = 202;
  } else {
    color = 196;
  }

  let face = "\uf118";
  if (apparentTemperature > 40) {
    face = "\ue3bf";
  } else if (apparentTemperature > 30) {
    face = "\ue36b";
  } else if (apparentTemperature < 10) {
    face = "\ue36f";
  } else if (apparentTemperature < 0) {
    face = "\uf9b6";
  }
  // return `#[fg=colour${color}]${parseInt((temp - 32) / 1.8)}°C`
  return `#[fg=colour${color}]${tempC}\ue339 #[fg=colour00]${face} #[fg=colour${color}]${apparentTemperature}\ue339`;
}

const key = process.env.WEATHER_API_KEY;
const city = "suzhou";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`;

getWeather(apiUrl)
  .then((res) => {
    console.log(`${temperature(res.current)}`);
  })
  .catch((err) => {
    lib.handleError("get-weather", err);
  });
