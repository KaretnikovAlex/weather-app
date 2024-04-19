import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import classes from './Weather.module.css'

function WeatherApp() {

  const [city, setCity] = useState('');
  const [info, setInfo] = useState(null);

  let error;

  function RenderDescription() {
    return info && info.weather[0].description
  }

  function RenderTemp() {
    if (info) {
      return (info.main.temp > 0 ? "+" : "") + info.main.temp + "°"
    }
  }

  function RenderFeels() {
    if (info) {
      return "Ощущается как: " + (info.main.feels_like > 0 ? "+" : "") + info.main.feels_like + "°"
    }
  }

  function RenderIcon() {
    return info && <img src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="weather icon" />
    //return info && <img src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="weather icon" />

  }

  function RenderHumidity() {
    return info && "Влажность: " + info.main.humidity + "%"
  }

  function RenderWind() {
    return info && "Ветер: " + info.wind.speed + "м/с"
  }

  function Button() {
    if (city.length < 2) {
      return <button disabled>Узнать погоду</button>
    } else {
      return <button onClick={getWeather}>Узнать погоду</button>
    }

  }

  function getWeather() {
    if (city.trim().length < 2) {
      error = "Слишком короткое название";
      return false;
    }
    error = '';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=59197f73e0598660897bb078f407dc23`)
      .then(result => (setInfo(result.data), console.log(result.data)));

  }

  return (
    <section className={classes.weatherApp}>

      <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Введите название города латинскими буквами" />
      <Button></Button>
      <p className="error">{error}</p>
      <table>
        <tbody>
          <tr><td><RenderDescription /></td></tr>
          <tr><td className={classes.mainTemp}><p><RenderTemp /></p><RenderIcon /></td></tr>
          <tr><td><RenderFeels /></td></tr>
          <tr><td><RenderHumidity /></td></tr>
          <tr><td><RenderWind /></td></tr>
        </tbody>
      </table>

    </section>
  );
}

export default WeatherApp;
