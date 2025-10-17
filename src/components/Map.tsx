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
}

const Map: React.FC<MapProps> = ( {rand, allBalloons, balloons} ) => {
  if(allBalloons){
    return (
      <div>
        <BalloonMap balloons={balloons}/>
      </div>
    );
  }
  return (
      <div>
        <BalloonMap balloons={[balloons[rand!]]}/>
      </div>
    );
};

export default Map;
