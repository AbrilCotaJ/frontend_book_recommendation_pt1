import React from "react";

function DataDisplay({ data }) {
  return (
    <div>
      <h2>Backend Data:</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DataDisplay;
