export default function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 wrap-anywhere gap-3 mt-3">
        {forecast.map((day, idx) => (
          <div key={idx} className=" p-2 rounded text-center">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
