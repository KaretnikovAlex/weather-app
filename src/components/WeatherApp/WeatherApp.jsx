import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import classes from './Weather.module.css'

function WeatherApp() {

  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  function keyDown(event) {
    event.key === "Enter" && getWeather()
  }

  const getWeather = async () => {
    setError('');
    setInfo(null);
    setLoading(true);

    if (city.trim().length < 2) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&lang=ru&units=metric&appid=59197f73e0598660897bb078f407dc23`);
      setInfo(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Ошибка при загрузке данных');
      }
    } finally {
      setLoading(false);
    }
  };

  const WeatherInfo = ({ info }) => {
    if (!info) return null;

    const RenderDescription = info.weather[0].description[0].toUpperCase() + info.weather[0].description.slice(1) //получаем описание и делаем первую букву заглавной
    const temp = `${info.main.temp > 0 ? '+' : ''}${info.main.temp}°`;
    const feelsLike = `Ощущается как: ${info.main.feels_like > 0 ? '+' : ''}${info.main.feels_like}°`;
    const humidity = `Влажность: ${info.main.humidity}%`;
    const wind = `Ветер: ${info.wind.speed} м/с`;
    const iconUrl = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;

    return (
      <>
        <tr>
          <td className={classes.mainTemp}>
            <p>{temp}</p>
            <img src={iconUrl} alt="weather icon" />
          </td>
        </tr>
        <tr>
          <td>{RenderDescription}</td>
        </tr>
        <tr>
          <td>{feelsLike}</td>
        </tr>
        <tr>
          <td>{humidity}</td>
        </tr>
        <tr>
          <td>{wind}</td>
        </tr>
      </>
    );
  };

  const SearchButton = ({ disabled, onClick }) => (
    <button onClick={onClick} disabled={disabled}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path fill="currentColor" d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.281 4.955l4.419 4.33a1 1 0 1 1-1.4 1.43l-4.444-4.357A8 8 0 0 1 3 11"></path>
      </svg>
    </button>
  );

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
              <SearchButton disabled={city.length < 2} onClick={getWeather} />
            </div>
            {error && <p>Город не найден</p>}</td>
          </tr>

          {loading ? (
            <tr>
              <td>Загрузка...</td>
            </tr>
          ) : (
            <WeatherInfo info={info} />
          )}
        </tbody>
      </table>

    </section>
  );
}

export default WeatherApp;
