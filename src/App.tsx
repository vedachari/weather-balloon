import React, { useEffect, useState } from "react";
import Map from './components/Map';
import Slider from './components/Slider';
import "./App.css";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

const App: React.FC = () => {
  const [rand, setRand] = useState<number | null>(null);
  const [data, setData] = useState<Balloon[] | null> (null);
  const [balloon, setBalloon] = useState<Balloon|null>(null);
  const [hour, setHour] = useState< number>(-1);

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
      if (rand === null){
          console.log("rand not chosen");
          return;
      };
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
          console.log(mapped[rand]);

          setData(mapped);
          setBalloon(mapped[rand]);
        } catch (err) {
          console.error(err);
        }
      };
  
      // only fetch if rand is set
      if (rand !== null) {
        console.log(rand);
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
      {/* Placeholder for other containers */}
        <div className="info-container">
          <p>Other content goes here</p>
        </div>
    </div>
  );
};

export default App;
