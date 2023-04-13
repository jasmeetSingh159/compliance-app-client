import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Replace with your backend server URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompanies = async () => {
  return await apiService.get("/companies");
};

export const getEmployees = async () => {
  return await apiService.get("/employees");
};

export const getTrucks = async () => {
  return await apiService.get("/trucks");
};

export const getTrailers = async () => {
  return await apiService.get("/trailers");
};

export const getJobs = async () => {
  return await apiService.get("/jobs");
};

export const getJobById = async (jobId: string) => {
  return await apiService.get(`/jobs/${jobId}`);
};

export const createJob = async (jobData: object) => {
  return await apiService.post("/jobs", jobData);
};

export const updateJob = async (jobId: string, jobData: object) => {
  return await apiService.put(`/jobs/${jobId}`, jobData);
};

export const deleteJob = async (jobId: string) => {
  return await apiService.delete(`/jobs/${jobId}`);
};

export const sendJobEmail = async (jobId: string) => {
  return await apiService.post(`/jobs/${jobId}/email`);
};

export default apiService;
