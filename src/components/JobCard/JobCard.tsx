import React, { useState, useEffect } from "react";
import { getEmployees } from "../../services/apiService";
import { Employee, Job } from "../../types";
import { TableCell } from "@mui/material";
interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [employees, setEmployees] = useState<Employee[] | null>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const jobsData = await getEmployees();

      setEmployees(jobsData);
    }
    fetchEmployees();
  }, []);

  function getEmployeeName(employeeId: number): string {
    const employee = employees!.find((emp: Employee) => emp.id === employeeId);
    if (employee) {
      return `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    }
    return "Unknown Employee";
  }

  return (
    <>
      <TableCell>{job.jobId}</TableCell>
      <TableCell>{job.truck}</TableCell>
      <TableCell>{job.pickupDate}</TableCell>
      <TableCell>{job.deliveryDate}</TableCell>
      <TableCell>{getEmployeeName(Number(job.employee))}</TableCell>
    </>
  );
};

export default JobCard;
