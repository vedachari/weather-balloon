import React, { useEffect, useState } from "react";
import BalloonMap from "./BalloonMap";

type Balloon = {
  lat: number;
  lon: number;
  alt: number;
};

const Map: React.FC<Balloon> = ( balloon ) => {
//   const [balloons, setBalloons] = useState<Balloon|null>(null);
// //   useEffect(() => {
// //     if (rand === null) return; // don’t fetch until rand is set
// //     fetchBalloons();
// //     }, [rand]);

//   useEffect(() => {
//     if (rand === null){
//         console.log("rand not chosen");
//         return;
//     };
//     const fetchBalloons = async () => {
//       try {
//         const res = await fetch(`/api/treasure/get/${file}`);
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const json = await res.json();

//         // convert API data to {lat, lon} format
//         const mapped = json.map((b: any) => ({
//           lat: b[0],
//           lon: b[1],
//           alt: b[2],
//         }));
//         console.log(mapped[rand]);

//         setBalloons(mapped[rand]);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     // only fetch if rand is set
//     if (rand !== null) {
//       console.log(rand);
//       fetchBalloons();
//     };
//   }, [rand]);

  return (
    <div>
      <BalloonMap balloon={balloon} />
    </div>
  );
};

export default Map;
