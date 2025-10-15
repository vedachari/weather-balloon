import React, { useEffect, useState } from "react";
import Map from './components/Map';

const App: React.FC = () => {
  const [rand, setRand] = useState<number | null>(null);

  // Generate initial random number
  useEffect(() => {
    const r = Math.floor(Math.random() * 1000);
    setRand(r);
  }, []);

  // Log whenever rand changes
  useEffect(() => {
    console.log("Random index chosen:", rand);
  }, [rand]);

  // Handler for "New Balloon" button
  const handleNewBalloon = () => {
    const r = Math.floor(Math.random() * 1000);
    setRand(r);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "16px" }}>
      {/* Button at the top */}
      <button onClick={handleNewBalloon} style={{ marginBottom: "16px", padding: "8px 16px" }}>
        Show New Balloon
      </button>

      {/* Map container and other content */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", flex: 1 }}>
        {/* Map is 1/4 of page */}
        <div style={{ flex: "0 0 25%", height: "50vh", width: "50vw", border: "1px solid #ccc" }}>
          <Map rand={rand} />
        </div>

        {/* Placeholder for other containers */}
        <div style={{ flex: "1 1 auto", border: "1px solid #ccc" }}>
          <p>Other content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default App;
