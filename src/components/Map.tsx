import React from "react";
import BalloonMap from "./BalloonMap";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

const Map: React.FC<Balloon> = ( balloon ) => {
  return (
    <div>
      <BalloonMap balloon={balloon} />
    </div>
  );
};

export default Map;
