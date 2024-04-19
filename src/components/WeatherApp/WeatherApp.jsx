import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import classes from './Weather.module.css'

function WeatherApp() {

  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null);

  function keyDown(event) {
    event.key === "Enter" && getWeather()
  }

  function RenderDescription() {
    return info && info.weather[0].description[0].toUpperCase() + info.weather[0].description.slice(1) //получаем описание и делаем первую букву заглавной
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
  }

  function RenderHumidity() {
    return info && "Влажность: " + info.main.humidity + "%"
  }

  function RenderWind() {
    return info && "Ветер: " + info.wind.speed + "м/с"
  }

  function Button() {
    if (city.length < 2) {
      return <button disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.281 4.955l4.419 4.33a1 1 0 1 1-1.4 1.43l-4.444-4.357A8 8 0 0 1 3 11"></path></svg></button>
    } else {
      return <button onClick={getWeather}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.281 4.955l4.419 4.33a1 1 0 1 1-1.4 1.43l-4.444-4.357A8 8 0 0 1 3 11"></path></svg></button>
    }
  }

  function getWeather() {
    setError('');
    setInfo(null);// перед следующим запросом стираем прошлые данные

    if (city.trim().length < 2) {
      return false;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&lang=ru&units=metric&appid=59197f73e0598660897bb078f407dc23`)
      .then(result => (setInfo(result.data)))
      .catch(function (error) {
        if (error.response) {
          // Запрос был сделан, и сервер ответил кодом состояния, который
          // выходит за пределы 2xx
          setError(error.response.data.message);
        }
      });

  }

  return (
    <section className={classes.weatherApp}>
      <table>
        <tbody>
          <tr>
            <td><div className={classes.search}>
              <input type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                onKeyDown={keyDown}
                placeholder="Название города" />
              <Button />
            </div>
              <p>{error ? 'Город не найден': ''}</p></td>
          </tr>

          <tr><td className={classes.mainTemp}><p><RenderTemp /></p><RenderIcon /></td></tr>
          <tr><td><RenderDescription /></td></tr>
          <tr><td><RenderFeels /></td></tr>
          <tr><td><RenderHumidity /></td></tr>
          <tr><td><RenderWind /></td></tr>
        </tbody>
      </table>

    </section>
  );
}

export default WeatherApp;
