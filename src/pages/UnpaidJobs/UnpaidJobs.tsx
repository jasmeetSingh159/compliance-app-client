import React, { useEffect, useState } from "react";
import { Employee, Job } from "../../types";
import { getEmployees, getJobs, updateJob } from "../../services/apiService";
import { Box, Typography } from "@mui/material";
import JobModal from "../../components/JobModal/JobModal";
import JobCard from "../../components/JobCard/JobCard";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const UnpaidJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const navigate = useNavigate();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleOpenJobModal = async (job: Job) => {
    let newJob: Job = job;
    newJob.status = "closed";
    updateJob(newJob.jobId, newJob);

    //navigate(`/invoice/${job.jobId}`); Set this in next version
  };

  // Function to handle closing the JobModal
  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchJobs() {
      const jobsData = await getJobs();
      console.log(jobsData);
      setJobs(jobsData.filter((job: Job) => job.status === "unpaid"));
    }

    fetchJobs();
  }, []);

  const handleSubmit = (e: any) => {
    console.log(e);
    updateJob(selectedJob!.jobId, e);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Billed Jobs
      </Typography>
      <TableContainer>
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

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((sjob: Job) => (
              <TableRow key={sjob.jobId}>
                <JobCard job={sjob} />
                <TableCell>
                  <Button onClick={() => handleOpenJobModal(sjob)}>
                    Close{/*Email set this in next version*/}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UnpaidJobs;
