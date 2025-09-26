import { useEffect, useState } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import Forecast from "./components/Forecast.jsx";
import SearchBar from "./components/SearchBar.jsx";

const API_KEY = "0dcd294fc64caa808d11a757ab0620d3";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCity, setLastCity] = useState(localStorage.getItem("lastCity") || "");

  useEffect(() => {
    if (lastCity) fetchWeather(lastCity);
  }, [lastCity]);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.filter((_, idx) => idx % 8 === 0));
      setLastCity(city);
      localStorage.setItem("lastCity", city);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found!");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#222222] flex justify-center items-center min-h-screen text-white">
      <div className="max-w-sm mx-auto p-4 text-center bg-[#8e8282] rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          🌦 Weather App {weather ? `- ${weather.name}` : ""}
        </h1>
        
        <SearchBar onSearch={fetchWeather} />
        
        {lastCity && (
          <button
            className="mt-3 bg-red-500 px-3 py-1 rounded text-sm"
            onClick={() => {
              setWeather(null);
              setForecast([]);
              setLastCity("");
              localStorage.removeItem("lastCity");
            }}
          >
            Clear Search
          </button>
        )}

        <WeatherDisplay data={weather} loading={loading} error={error} />
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}
