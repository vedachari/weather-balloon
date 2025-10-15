import React, { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBounds } from "leaflet";

// Define type
type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

const Recenter: React.FC<{ position: LatLngExpression }> = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};


const BalloonMap: React.FC<{ balloon: Balloon | null}> = ({ balloon }) => {
  if(!balloon) return null;
  console.log("Balloon received:", balloon);


  return (
    <MapContainer
      center={[balloon.lat, balloon.lon]}
      // center={[0, balloon.lon]}
      zoom={2}
      style={{ height: "50vh", width: "50vw" }}
      scrollWheelZoom={false}
    >
      {/* <FitBounds balloons={balloons} /> */}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

        <CircleMarker
          key={balloon.alt}
          center={[balloon.lat, balloon.lon]}
          radius={5}
          color="red"
          fillColor="red"
          fillOpacity={0.8}
        >
          <Popup>{balloon.alt || `Balloon ${balloon.alt + 1}`}</Popup>
        </CircleMarker>
        <Recenter position = {[balloon.lat, balloon.lon]}/>
    </MapContainer>
  );
};

export default BalloonMap;
