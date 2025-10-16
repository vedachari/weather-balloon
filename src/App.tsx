import React, { useEffect, useRef, useState } from "react";
import Map from './components/Map';
import Slider from './components/Slider';
import Meteo from './components/Meteo';
import "./App.css";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

const App: React.FC = () => {
  const [rand, setRand] = useState<number | null>(null);
  const randRef = useRef(rand);
  const [data, setData] = useState<Balloon[] | null> (null);
  const [balloon, setBalloon] = useState<Balloon|null>(null);
  const [hour, setHour] = useState< number>(-1);

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
  }, [rand]);

  // Handler for "New Balloon" button
  const handleNewBalloon = () => {
    const r = Math.floor(Math.random() * 1000);
    if (data){
      setBalloon(data[r]);
    };
    setRand(r);
  };

  // Hour changed so get new balloon values
  useEffect(() => {
      const fetchBalloons = async () => {
        try {
          console.log("fetching hour %d", hour);
          const res = await fetch(`/api/treasure/get/${hour}`);
          if (!res.ok) throw new Error("Failed to fetch data");
  
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

  return (
    <div className="page">
      {/* Button at the top */}
      <div className="button">
        <button onClick={handleNewBalloon} className="generate-button">
          Show New Balloon
        </button>
      </div>

      {/* Map container */}
      <div className="map-container">
          <div className="map">
            {balloon && (<Map lat = {balloon.lat} lon = {balloon.lon} alt = {balloon.alt} />)}
          </div>
          
      </div>
      <div className="slider">
            <Slider 
              hour = {hour}
              setHour = {setHour}/>
          </div>
        <div className="info-container">
          <h1>Weather Info</h1>
          {balloon && (<Meteo lat = {balloon.lat} lon = {balloon.lon} hour = {hour}/>)}
        </div>
    </div>
  );
};

export default App;
