// WeatherApp.js
import React, { useState } from "react";
import style from "./Weather.module.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "0fb4afa26a08451f9d153850240103";

  const fetchWeatherData = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        setWeatherData(data.current);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setWeatherData(null);
      });
  };

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    fetchWeatherData();
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className={style.container}>
      <h1>Weather Application</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className={style.weather_card}>
            <h3>Temperature</h3>
            <p>{weatherData.temp_c} °C</p>
          </div>
          <div className={style.weather_card}>
            <h3>Humidity</h3>
            <p>{weatherData.humidity}%</p>
          </div>
          <div className={style.weather_card}>
            <h3>Condition</h3>
            <p>{weatherData.condition.text}</p>
          </div>
          <div className={style.weather_card}>
            <h3>Wind Speed</h3>
            <p>{weatherData.wind_kph} km/h</p>
          </div>
        </div>
      )}
      {!loading && !error && !weatherData && (
        <p>No weather data found for {city}.</p>
      )}
    </div>
  );
}

export default Weather;
