import React from "react";
import BalloonMap from "./BalloonMap";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

type MapProps = {
  rand: number | null;
  allBalloons: boolean;
  balloons: Balloon[];
  setRand: any;
  setWeatherData: any;
}

const Map: React.FC<MapProps> = ( {rand, allBalloons, balloons, setRand, setWeatherData} ) => {
  if(allBalloons){
    return (
      <div>
        <BalloonMap balloons={balloons} setRand = {setRand} setWeatherData={setWeatherData}/>
      </div>
    );
  }
  return (
      <div>
        <BalloonMap balloons={[balloons[rand!]]} setRand = {null} setWeatherData={setWeatherData}/>
      </div>
    );
};

export default Map;
