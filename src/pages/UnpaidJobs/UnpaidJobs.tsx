import React, { useEffect, useState } from "react";
import { Job } from "../../types";
import { Box, Typography } from "@mui/material";

const UnpaidJobs: React.FC = () => {
  const [unpaidJobs, setUnpaidJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch unpaid jobs data and set it to the state.
    // Replace this with the actual API call from apiService.ts
    const fetchUnpaidJobs = async () => {
      // const data = await apiService.getUnpaidJobs();
      // setUnpaidJobs(data);
    };

    fetchUnpaidJobs();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Unpaid Jobs
      </Typography>
      <ul>
        {unpaidJobs.map((job) => (
          <li key={job.jobId}>
            Job ID: {job.jobId}, Company: {job.company}, Amount:{" "}
            {job.customerAmount}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default UnpaidJobs;
