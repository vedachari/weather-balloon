import React, { useEffect, useState } from "react";

const Info: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/treasure/00.json");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Treasure Info</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && data.length === 0 && <p>Loading...</p>}

      {Array.isArray(data) ? (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default Info;
