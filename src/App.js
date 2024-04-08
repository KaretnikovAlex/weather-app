import { useState } from 'react';
import React from 'react';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('');
  const [info, setInfo] = useState(null);

  let error;

  function CityName() {
    return info && "«" + city + "»"
  }
  function RenderTemp() {
    return info && "Температура: " + info.main.temp + "C"
  }
  function RenderFeels() {
    return info && "Ощущается как: " + info.main.feels_like + "C"
  }
  function RenderMinTemp() {
    return info && "Минимальная температура: " + info.main.temp_min + "C"
  }
  function RenderMaxTemp() {
    return info && "Максимальная температура: " + info.main.temp_max + "C"
  }

  function getWeather() {
    if (city.trim().length < 2) {
      error = "Слишком короткое название";
      return false;
    }
    error = '';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${{ WEATHER_KEY }}`)
      .then(result => (setInfo(result.data)))
  }

  function Button() {
    if (city.length < 2) {
      return <button disabled>Узнать погоду</button>
    } else {
      return <button onClick={getWeather}>Узнать погоду</button>
    }
  }


  return (
    <div className="App">

      <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Введите название города латинскими буквами" />
      <Button></Button>
      <p className="error">{error}</p>
      <table>
        <tbody>
          <tr><td><CityName></CityName></td></tr>
          <tr><td><RenderTemp></RenderTemp></td></tr>
          <tr><td><RenderFeels></RenderFeels></td></tr>
          <tr><td><RenderMinTemp></RenderMinTemp></td></tr>
          <tr><td><RenderMaxTemp></RenderMaxTemp></td></tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;
