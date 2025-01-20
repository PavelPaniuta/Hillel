import React from "react";
import { useSelector } from "react-redux";

const SwapiResult = () => {
  const { data, loading, error } = useSelector((state) => state.swapi);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SwapiResult;
