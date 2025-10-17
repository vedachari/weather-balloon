import React from 'react';

type MeteoProps = {
    weatherData: any;
    hour: number;
    alt: number | any;
    rand: number | null;
}

const Meteo: React.FC<MeteoProps> = ({weatherData, hour, alt, rand}) => {

    if(!weatherData) return <div></div>;
    return (
    <div className="info-container">
      {hour > 0 && <h3>Balloon was here {hour} hours ago</h3>}
      <h3>Showing balloon {rand}</h3>
      <p>
        <strong>Coordinates:</strong> {weatherData.latitude.toFixed(2)}°,{" "}
        {weatherData.longitude.toFixed(2)}°
      </p>
      <p><strong>Altitude of Balloon:</strong> {alt} km</p>
      <p><strong>Elevation:</strong> {weatherData.elevation} m</p>
      <p><strong>Time Zone:</strong> {weatherData.timezone} ({weatherData.timezone_abbreviation})</p>
      <p>
        <strong>UTC offset:</strong>{" "}
        {Math.floor(weatherData.utcOffsetSeconds / 3600)}:
        {String(Math.abs((weatherData.utcOffsetSeconds % 3600) / 60)).padStart(2, "0")} hours
      </p>
      <p><strong>Temperature:</strong> {weatherData.hourly.temperature_2m?.[23-hour]} °C</p>
      <p><strong>Chance of Precipitation:</strong> {weatherData.hourly.precipitation_probability?.[23-hour]}%</p>
      <p><strong>Relative Humidity:</strong> {weatherData.hourly.relative_humidity_2m?.[23-hour]}%</p>
    </div>
  );

}

export default Meteo;