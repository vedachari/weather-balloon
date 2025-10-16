import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from 'react';

interface MeteoProps{
    lat: number;
    lon: number;
    hour: number;
}

const Meteo: React.FC<MeteoProps> = ({lat, lon, hour}) => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try{
                const params = {
                "latitude": lat,
                "longitude": lon,
                "daily": ["temperature_2m_max", "temperature_2m_min"],
                "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation"],
                "timezone": "auto",
                "forecast_days": 1,
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);

            const response = responses[0];
            console.log('response',response);

            // Attributes
            const utcOffsetSeconds = response.utcOffsetSeconds();

            const hourly = response.hourly()!;
            const daily = response.daily()!;

            const data = {
                latitude: response.latitude(),
                longitude: response.longitude(),
                elevation: response.elevation(),
                utcOffsetSeconds: response.utcOffsetSeconds(),
                timezone: response.timezone(),
                timezone_abbreviation: response.timezoneAbbreviation(),
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature_2m: hourly.variables(0)!.valuesArray(),
                    relative_humidity_2m: hourly.variables(1)!.valuesArray(),
                    precipitation_probability: hourly.variables(2)!.valuesArray(),
                    precipitation: hourly.variables(3)!.valuesArray(),
                },
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature_2m_max: daily.variables(0)!.valuesArray(),
                    temperature_2m_min: daily.variables(1)!.valuesArray(),
                },
            };
            console.log(
                `\nCoordinates: ${data.latitude}°N ${data.longitude}°E`,
                `\nElevation: ${data.elevation}m asl`,
                `\nTimezone difference to GMT+0: ${data.utcOffsetSeconds}s`,
                `\nTimezone: ${data.timezone}s`,
            );
            console.log("\nHourly data", data.hourly)
            console.log("\nDaily data", data.daily)
            setWeatherData(data);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };
        fetchWeather();
    }, [lat, lon]);

    if(!weatherData) return <p> Loading weather data</p>
    return (
    <div>
        {hour===0 &&  (<h3>Balloon is here</h3>)}
        {hour > 0 && (<h3>Balloon was here {hour } hours ago</h3>)}
      <p>
        Coordinates: {weatherData.latitude.toFixed(2)}°,{" "}
        {weatherData.longitude.toFixed(2)}°
      </p>
      <p>Elevation: {weatherData.elevation} m</p>
      <p>Time Zone: {weatherData.timezone} ({weatherData.timezone_abbreviation})</p>
      <p>UTC offset: {Math.floor(weatherData.utcOffsetSeconds / 3600)}:
  {String(Math.abs((weatherData.utcOffsetSeconds % 3600) / 60)).padStart(2, "0")}</p>
      <p>Temperature: {weatherData.hourly.temperature_2m?.[24-hour]} °C</p>
      <p>Chance of Precipitation: {weatherData.hourly.precipitation_probability?.[24-hour]}%</p>
      <p>Relative Humidity: {weatherData.hourly.relative_humidity_2m?.[24-hour]}%</p>
    </div>
  );
}

export default Meteo;