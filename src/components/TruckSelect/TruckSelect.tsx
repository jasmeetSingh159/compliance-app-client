import React, { useEffect, useState } from "react";
import { Truck } from "../../types";
import { getTrucks } from "../../services/apiService";

interface TruckSelectProps {
  onChange: (truck: Truck) => void;
}

export const TruckSelect: React.FC<TruckSelectProps> = ({ onChange }) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    async function fetchTrucks() {
      const response = await getTrucks();
      setTrucks(response);
    }
    fetchTrucks();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTruck = trucks.find(
      (truck) => truck.id === Number(event.target.value)
    );
    if (selectedTruck) {
      onChange(selectedTruck);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a truck</option>
      {trucks.map((truck) => (
        <option key={truck.id} value={truck.id}>
          {truck.id}
        </option>
      ))}
    </select>
  );
};
