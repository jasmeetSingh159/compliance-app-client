import React, { useEffect, useState } from "react";
import { Trailer } from "../../types";
import { getTrailers } from "../../services/apiService";

interface TrailerSelectProps {
  onChange: (trailer: Trailer) => void;
}

export const TrailerSelect: React.FC<TrailerSelectProps> = ({ onChange }) => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    async function fetchTrailers() {
      const response = await getTrailers();
      setTrailers(response);
    }
    fetchTrailers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrailer = trailers.find(
      (trailer) => trailer.id === Number(event.target.value)
    );
    if (selectedTrailer) {
      onChange(selectedTrailer);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a trailer</option>
      {trailers.map((trailer) => (
        <option key={trailer.id} value={trailer.id}>
          {trailer.id}
        </option>
      ))}
    </select>
  );
};
