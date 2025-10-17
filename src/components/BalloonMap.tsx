import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import './BalloonMap.css'
// Define type
type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

type BalloonMapProps ={ 
  balloons: Balloon[] | null;
  setRand: any;
}

const Recenter: React.FC<{ position: LatLngExpression }> = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

const Click: React.FC<{ position: LatLngExpression, index: number, setRand: any}> = ({ position, index, setRand}) => {
  const map = useMap();
  map.on('click', function(ev) {
    console.log('clicked!'); // ev is an event object (MouseEvent in this case)
    if(ev.latlng === position){
      console.log(' setting rand to ', index);
      setRand(index);
    };
  });
  return null;
};


const BalloonMap: React.FC<BalloonMapProps> = ({ balloons, setRand }) => {
  if(!balloons) return null;
  console.log("Balloon received:", balloons);


  return (
    <MapContainer
      center={[0,0]}
      // center={[0, balloon.lon]}
      className="map"
      zoom={2}
      scrollWheelZoom={false}
    >
      {/* <FitBounds balloons={balloons} /> */}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {balloons.map((balloon, index) => (
        <div key={index}>
          <CircleMarker
            center={[balloon.lat, balloon.lon]}
            radius={Math.max(3, balloon.alt / 10)} // scale radius by altitude
            color={balloons.length === 1 ? "black":(balloon.alt > 10 ? "black" : "red")}
            fillOpacity={0.8}
          >
            <Popup >{`Alt: ${balloon.alt} km`}</Popup>
          </CircleMarker>

          {balloons.length === 1 && (<Recenter position={[balloon.lat, balloon.lon]} />)}
          {/* {setRand  && (<Click position={[balloon.lat, balloon.lon]} index = {index} setRand = {setRand}/>)} */}
        </div>
      ))}
    </MapContainer>
  );
};

export default BalloonMap;
