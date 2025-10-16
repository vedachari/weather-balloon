import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from 'react';

interface MeteoProps{
    lat: number;
    lon: number;
}

const Meteo: React.FC<MeteoProps> = ({lat, lon}) => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try{
                const params = {
                "latitude": lat,
                "longitude": lon,
                "hourly": "temperature_2m",
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);

            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];

            // Attributes for timezone and location
            const latitude = response.latitude();
            const longitude = response.longitude();
            const elevation = response.elevation();
            const utcOffsetSeconds = response.utcOffsetSeconds();

            console.log(
                `\nCoordinates: ${latitude}°N ${longitude}°E`,
                `\nElevation: ${elevation}m asl`,
                `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
            );

            const hourly = response.hourly()!;

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const data = {
                latitude: response.latitude(),
                longitude: response.longitude(),
                elevation: response.elevation(),
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature_2m: hourly.variables(0)!.valuesArray(),
                },
            };
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
      <h3>
        Coordinates: {weatherData.latitude.toFixed(2)}°,{" "}
        {weatherData.longitude.toFixed(2)}°
      </h3>
      <p>Elevation: {weatherData.elevation} m</p>
      <p>First Hourly Temp: {weatherData.hourly.temperature_2m?.[0]} °C</p>
    </div>
  );
}

export default Meteo;