import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Replace with your backend server URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
