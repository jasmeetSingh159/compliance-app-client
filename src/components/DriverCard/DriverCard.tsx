import React, { useState, useEffect } from "react";
import { getEmployees } from "../../services/apiService";
import { Employee, Job } from "../../types";
import { TableCell } from "@mui/material";
interface JobCardProps {
  driver: Employee;
}

const DriverCard: React.FC<JobCardProps> = ({ driver }) => {
  return (
    <>
      <TableCell>{driver.employeeNumber}</TableCell>
      <TableCell>{driver.licenseNumber}</TableCell>
      <TableCell>{driver.licenseState}</TableCell>
      <TableCell>{driver.licenseType}</TableCell>
      <TableCell>{driver.mobileNumber}</TableCell>
      <TableCell>
        {driver.firstName} {driver?.middleName} {driver.lastName}
      </TableCell>
      <TableCell>{driver.dateOfBirth}</TableCell>
      <TableCell>
        {driver.street} {driver.suburb}, {driver.state} {driver.postcode}{" "}
      </TableCell>
      <TableCell>{driver.email}</TableCell>
    </>
  );
};

export default DriverCard;
