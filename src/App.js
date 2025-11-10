import React, { useEffect, useState } from "react";
import { getData } from "./api";
import DataDisplay from "./components/DataDisplay";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React Frontend Connected to Backend</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <DataDisplay data={data} />
    </div>
  );
}

export default App;
