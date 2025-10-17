import React from 'react';

type MeteoProps = {
    weatherData: any;
    hour: number;
    alt: number;
}

const Meteo: React.FC<MeteoProps> = ({weatherData, hour, alt}) => {

    if(!weatherData) return <p> Loading weather data</p>
    return (
    <div>
        {hour > 0 && (<h3>Balloon was here {hour } hours ago</h3>)}
      <p>
        Coordinates: {weatherData.latitude.toFixed(2)}°,{" "}
        {weatherData.longitude.toFixed(2)}°
      </p>
      <p>Altitude: {alt} m</p>
      <p>Elevation: {weatherData.elevation} m</p>
      <p>Time Zone: {weatherData.timezone} ({weatherData.timezone_abbreviation})</p>
      <p>UTC offset: {Math.floor(weatherData.utcOffsetSeconds / 3600)}:
  {String(Math.abs((weatherData.utcOffsetSeconds % 3600) / 60)).padStart(2, "0")} hours</p>
      <p>Temperature: {weatherData.hourly.temperature_2m?.[23-hour]} °C</p>
      <p>Chance of Precipitation: {weatherData.hourly.precipitation_probability?.[23-hour]}%</p>
      <p>Relative Humidity: {weatherData.hourly.relative_humidity_2m?.[23-hour]}%</p>
    </div>
  );
}

export default Meteo;