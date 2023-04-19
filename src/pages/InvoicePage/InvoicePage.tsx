import React from "react";
import { useParams } from "react-router-dom";
import { Job } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import JobCard from "../../components/JobCard/JobCard";
import { useState, useEffect } from "react";
import { getJobById } from "../../services/apiService";

const InvoicePage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  // Fetch job details and generate the invoice here

  const handleEmailInvoice = () => {
    // Logic to email the invoice
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await getJobById(jobId!);
        setJob(jobData);
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };

    fetchJobData();
  }, [jobId]);

  return (
    <div>
      <h1>Invoice for Job ID: {jobId}</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Truck</TableCell>
            <TableCell>Trailers</TableCell>
            <TableCell>Pickup Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Trip</TableCell>
            <TableCell>Customer Amount</TableCell>
            <TableCell>Driver Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {job ? (
            <TableRow key={job!.jobId}>
              <JobCard job={job!} />
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      <Button onClick={handleEmailInvoice}>Email Invoice</Button>
    </div>
  );
};

export default InvoicePage;
