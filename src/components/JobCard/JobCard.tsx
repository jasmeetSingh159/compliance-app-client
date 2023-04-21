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
      <TableCell>{job.company}</TableCell>
      <TableCell>{job.truck}</TableCell>
      <TableCell>
        {job.trailer1}
        {job.trailer2 ? `${job.trailer2},` : ""}
        {job.trailer3 ? `${job.trailer3},` : ""}
        {job.trailer4 ? `${job.trailer4},` : ""}
      </TableCell>
      <TableCell>{job.pickupDate}</TableCell>
      <TableCell>{job.deliveryDate}</TableCell>
      <TableCell>{getEmployeeName(Number(job.employee))}</TableCell>
      <TableCell>
        {job.pickupCity}-&gt;-&gt;{job.dropOffCity}
      </TableCell>
      <TableCell>
        {job.customerAmount != null ? `$${job.customerAmount}` : "Not added"}
      </TableCell>
      <TableCell>
        {job.driverAmount != null ? `$${job.driverAmount}` : "Not added"}
      </TableCell>
    </>
  );
};

export default JobCard;
