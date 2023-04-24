import React, { useEffect, useState } from "react";
import { Employee, Job } from "../../types";
import { getEmployees, getJobs, updateJob } from "../../services/apiService";
import { Box, Typography } from "@mui/material";
import JobModal from "../../components/JobModal/JobModal";
import JobCard from "../../components/JobCard/JobCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const CreatedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Function to handle opening the JobModal
  const handleOpenJobModal = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // Function to handle closing the JobModal
  const handleCloseJobModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchJobs() {
      const jobsData = await getJobs();

      setJobs(jobsData.filter((job: Job) => job.status === "created"));
    }

    fetchJobs();
  }, []);

  const handleSubmit = (e: any) => {
    console.log(e);
    updateJob(selectedJob!.jobId, e);
    setShowModal(false);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Active Jobs
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
                  <Button onClick={() => handleOpenJobModal(sjob)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showModal && (
        <JobModal
          show={showModal}
          onClose={handleCloseJobModal}
          job={selectedJob!}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default CreatedJobs;
