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
}

const Map: React.FC<MapProps> = ( {rand, allBalloons, balloons, setRand} ) => {
  if(allBalloons){
    return (
      <div>
        <BalloonMap balloons={balloons} setRand = {setRand}/>
      </div>
    );
  }
  return (
      <div>
        <BalloonMap balloons={[balloons[rand!]]} setRand = {null}/>
      </div>
    );
};

export default Map;
