export default function WeatherDisplay({ data, loading, error }) {
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧";
      case "Snow": return "❄️";
      case "Thunderstorm": return "⛈";
      case "Drizzle": return "🌦";
      default: return "🌡";
    }
  };

  if (loading) return <p className="animate-spin">🔄 Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No data yet. Search for a city!</p>;

  return (
    <div className="text-center mt-6 bg-white/10 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p>{getWeatherIcon(data.weather[0].main)} {data.weather[0].main}</p>
      <p>🌡 {Math.round(data.main.temp)}°C</p>
      <p>Min: {Math.round(data.main.temp_min)}°C | Max: {Math.round(data.main.temp_max)}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
    </div>
  );
}
