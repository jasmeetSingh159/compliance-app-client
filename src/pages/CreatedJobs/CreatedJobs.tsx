import React, { useEffect, useState } from "react";
import { Job } from "../../types";
import { Box, Typography } from "@mui/material";

const CreatedJobs: React.FC = () => {
  const [createdJobs, setCreatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch created jobs data and set it to the state.
    // Replace this with the actual API call from apiService.ts
    const fetchCreatedJobs = async () => {
      // const data = await apiService.getCreatedJobs();
      // setCreatedJobs(data);
    };

    fetchCreatedJobs();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Created Jobs
      </Typography>
      <ul>
        {createdJobs.map((job) => (
          <li key={job.jobId}>
            Job ID: {job.jobId}, Company: {job.company}, Pick-up City:{" "}
            {job.pickupCity}, Drop-off City: {job.dropOffCity}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CreatedJobs;
