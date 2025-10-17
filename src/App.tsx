import React, { useEffect, useRef, useState } from "react";
import Map from './components/Map';
import Slider from './components/Slider';
import Meteo from './components/Meteo';
import { fetchWeatherApi } from 'openmeteo';
import "./App.css";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

/*basic flow
- get hour 0 and display all
- if user enters balloon/ generates random number: switch to single balloon
- user can switch back to see all balloons at that time
- hour changes using slider: stays consistent across time toggle */

const App: React.FC = () => {
  //states
  const [allBalloons, setAllBalloons] = useState<boolean>(true); //currently viewing all balloons?
  const [getWeather, setGetWeather] = useState<boolean>(false); //shoudl fetch weather for balloon
  //data
  const [rand, setRand] = useState<number | null>(null);
  const randRef = useRef(rand);
  const [data, setData] = useState<Balloon[] | null> (null); //all balloons
  const [balloon, setBalloon] = useState<Balloon|null>(null);
  const [hour, setHour] = useState< number>(-1);
  const [weatherData, setWeatherData] = useState<any>(null); // weather data for #rand balloon

  //change rand ref
  useEffect(() => {
    randRef.current = rand;
  }, [rand]);

  // Generate initial random number
  useEffect(() => {
    const r = Math.floor(Math.random() * 1000);
    setHour(0);
    setRand(r);
  }, []);

  // Log whenever rand changes
  useEffect(() => {
    console.log("Random index chosen:", rand);
  }, [rand, allBalloons]);

  // Handler for "New Random Balloon" button
  const handleNewBalloon = () => {
    // choose random balloon
    const r = Math.floor(Math.random() * 1000);
    if (data){
      setBalloon(data[r]);
      setGetWeather(true);
      console.log("Changed get weather to true");
    };
    setAllBalloons(false);
    setRand(r);
  };

  // Handler for "switch view" button
  const handleSwitchView = () => {
    console.log('All balloons now ', !allBalloons);
    setAllBalloons(!allBalloons); //switch view
    if(weatherData == null){
      setGetWeather(true);
    }
  };


  // Hour changed so get new balloon values
  useEffect(() => {
      const fetchBalloons = async () => {
        try {
          console.log("fetching hour %d", hour);
          const res = await fetch(`/api/treasure/get/${hour}`);
          if (!res.ok){ 
            setHour(hour+1);
            throw new Error("Failed to fetch data");
          };
  
          const json = await res.json();
  
          // convert API data to {lat, lon} format
          const mapped = json.map((b: any) => ({
            lat: b[0],
            lon: b[1],
            alt: b[2],
          }));
          console.log(mapped[randRef.current!]);

          setData(mapped);
          setBalloon(mapped[randRef.current!]);
        } catch (err) {
          console.error(err);
        }
      };
      if (randRef.current === null){
          console.log("rand not chosen");
          return;
      }else{
        fetchBalloons();
      };
    }, [hour]);

    // //get weather data: put here to all fewer times
    useEffect(() => {
        const fetchWeather = async () => {
          console.log("getting weather");
            if(balloon?.lat == null || balloon?.lon == null){
              return
            }
            try{
                const params = {
                "latitude": balloon.lat,
                "longitude": balloon.lon,
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
            setGetWeather(false);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };
        if(!getWeather){
          console.log("get weather is false so not getting");
          return;
        }
        fetchWeather();
    }, [getWeather]);

  return (
    <div className="page">
      {/* Button at the top */}
      <div className="button">
        <button onClick={handleNewBalloon} className="generate-button">
          Show New Random Balloon
        </button>
        {allBalloons && (<button onClick={handleSwitchView} className="generate-button">
          Show Balloon # {rand}
        </button>)}
        {!allBalloons && (<button onClick={handleSwitchView} className="generate-button">
          Show all balloons
        </button>)}
      </div>

      {/* Map container */}
      <div className="map-container">
          <div className="map">
            {data && (<Map rand={rand} allBalloons= {allBalloons} balloons={data}/>)}
          </div>
          
      </div>
      <div className="slider">
            <Slider 
              hour = {hour}
              setHour = {setHour}/>
          </div>
        <div className="info-container">
          <h1>Weather Info</h1>
          {!allBalloons && (<Meteo weatherData = {weatherData} hour = {hour}/>)}
        </div>
    </div>
  );
};

export default App;
