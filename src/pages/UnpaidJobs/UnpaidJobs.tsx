import React, { useEffect, useState } from "react";
import { Job } from "../../types";
import { getJobs } from "../../services/apiService";
import { Box, Typography } from "@mui/material";
import JobCard from "../../components/JobCard/JobCard";

const UnpaidJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const jobsData = await getJobs();
      setJobs(jobsData.data.filter((job: Job) => job.status === "Unpaid"));
    }
    fetchJobs();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Unpaid Jobs
      </Typography>
      <ul>
        {jobs.map((job) => (
          <div>"</div>
        ))}
      </ul>
    </Box>
  );
};

export default UnpaidJobs;
