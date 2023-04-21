import React, { useState, useEffect } from "react";
import { Vehicle } from "../../types";
import { TableCell } from "@mui/material";
interface JobCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<JobCardProps> = ({ vehicle }) => {
  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <>
      <TableCell>{vehicle.registration}</TableCell>
      <TableCell>{vehicle.vin}</TableCell>
      <TableCell>{vehicle.nextService}</TableCell>
      <TableCell
        style={
          parseDate(vehicle.nextServiceDate) < new Date()
            ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
            : parseDate(vehicle.nextServiceDate) <
              new Date(new Date().setDate(new Date().getDate() + 14))
            ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
            : {}
        }
      >
        {vehicle.nextServiceDate}
      </TableCell>
      <TableCell>{vehicle.lastService}</TableCell>
      <TableCell>{vehicle.lastServiceDate}</TableCell>
      <TableCell
        style={
          parseDate(vehicle.regoExp) < new Date()
            ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
            : parseDate(vehicle.regoExp) <
              new Date(new Date().setDate(new Date().getDate() + 14))
            ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
            : {}
        }
      >
        {vehicle.regoExp}
      </TableCell>
      <TableCell>{vehicle.buildYear}</TableCell>
    </>
  );
};

export default VehicleCard;
