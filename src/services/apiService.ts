import axios, { AxiosResponse } from "axios";
import { Company, Employee, Job, Truck, Trailer } from "../types";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend server URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const mapCompanyData = (data: any[]): Company[] => {
  return data.map((item, index) => ({
    id: Number(index) + 1,
    name: item[0],
    abn: item[1],
    email: item[2],
    number: item[3],
    address: item[4],
    suburb: item[5],
    state: item[6],
    postcode: item[7],
    invoicename: item[8],
    comments: item[9],
  }));
};

const mapEmployeeData = (data: any[]): Employee[] => {
  return data.map((item, index) => ({
    id: index + 1,
    employeeNumber: item[0],
    licenseNumber: item[1],
    licenseState: item[2],
    licenseType: item[3],
    mobileNumber: item[4],
    firstName: item[5],
    middleName: item[6],
    lastName: item[7],
    dateOfBirth: item[8],
    street: item[9],
    suburb: item[10],
    state: item[11],
    postcode: item[12],
    email: item[13],
  }));
};

const mapJobData = (data: any[]): Job[] => {
  return data.map((item, index) => ({
    jobId: item[0],
    company: item[1],
    pickupCity: item[2],
    dropOffCity: item[3],
    pickupDate: item[4],
    deliveryDate: item[5],
    deliveryType: item[6],
    employee: item[7],
    truck: item[8],
    trailer1: item[9],
    trailer2: item[10],
    trailer3: item[11],
    trailer4: item[12],
    price: item[13],
    status: item[14],
    preTrip: item[15],
    safeJourneyPlan: item[16],
    pods: item[17],
    customerRate: item[18],
    customerGst: item[19],
    customerAmount: item[20],
    driverRate: item[21],
    driverGst: item[22],
    driverAmount: item[23],
  }));
};

const mapTruckData = (truckData: any[]): Truck[] => {
  return truckData.map((t, index) => ({
    id: index + 1,
    model: t[0],
    registration: t[1],
    vin: t[2],
    tare: t[3],
    grossVehicleMass: t[4],
    make: t[5],
  }));
};

const mapTrailerData = (trailerData: any[]): Trailer[] => {
  return trailerData.map((t, index) => ({
    id: index + 1,
    make: t[0],
    model: t[1],
    registration: t[2],
    vin: t[3],
    tare: t[4],
    grossVehicleMass: t[5],
  }));
};

const handleApiResponse = (
  response: AxiosResponse,
  mapper: (data: any[]) => any
) => {
  return mapper(response.data);
};

export const getCompanies = async () => {
  const response = await apiService.get("/companies");
  return handleApiResponse(response, mapCompanyData);
};

export const getEmployees = async () => {
  const response = await apiService.get("/employees");
  return handleApiResponse(response, mapEmployeeData);
};

export const getTrucks = async () => {
  const response = await apiService.get("/trucks");
  return mapTruckData(response.data);
};

export const getTrailers = async () => {
  const response = await apiService.get("/trailers");
  return mapTrailerData(response.data);
};

export const getJobs = async () => {
  const response = await apiService.get("/jobs");
  return handleApiResponse(response, mapJobData);
};

export const getJobById = async (jobId: string) => {
  const response = await apiService.get(`/jobs/${jobId}`);
  return handleApiResponse(response, mapJobData)[0];
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

export default apiService;
