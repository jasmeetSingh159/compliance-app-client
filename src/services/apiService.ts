import axios, { AxiosResponse } from "axios";
import { Company, Employee, Job, Truck, Trailer } from "../types";
import { auth } from '../firebase';

const API_BASE_URL = `https://server.fleetwisesolutions.au`; // Replace with your backend server URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "wagB6-nXfBild2ZdAtp-SfvRRZM" 
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
    licenseExpiry: item[14],
    status: item[15],
    demeritExpiry: item[16],
    fatigueType: item[17],
    BFMDate: item[18],
    BFMStart: item[19],
    BFMEnd: item[20],
    medicalExpiry: item[21],
    policeExpiry: item[22],
    WAFatigueExpiry: item[23],
    workRightExpiry: item[24],
    workRightStatus: item[25],
    inductionDate: item[26],
    comments: item[27],
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
    registration: t[0],
    vin: t[1],
    make: t[2],
    fleetNumber: t[3],
    regoState: t[4],
    status: t[5],
    regoExp: t[6],
    lastService: t[7],
    lastServiceDate: t[8],
    nextService: t[9],
    nextServiceDate: t[10],
    buildYear: t[11],
  }));
};

const mapTrailerData = (truckData: any[]): Trailer[] => {
  return truckData.map((t, index) => ({
    id: index + 1,
    registration: t[0],
    vin: t[1],
    make: t[2],
    fleetNumber: t[3],
    regoState: t[4],
    status: t[5],
    regoExp: t[6],
    lastService: t[7],
    lastServiceDate: t[8],
    nextService: t[9],
    nextServiceDate: t[10],
    buildYear: t[11],
  }));
};

const handleApiResponse = (
  response: AxiosResponse,
  mapper: (data: any[]) => any
) => {
  return mapper(response.data);
};

export const getCompanies = async () => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/companies/${customer}`);
  return handleApiResponse(response, mapCompanyData);
};

export const getEmployees = async () => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/employees/${customer}`);
  return handleApiResponse(response, mapEmployeeData);
};

export const getTrucks = async () => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/trucks/${customer}`);
  return mapTruckData(response.data);
};

export const getTrailers = async () => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/trailers/${customer}`);
  return mapTrailerData(response.data);
};

export const getJobs = async () => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/jobs/${customer}`);
  return handleApiResponse(response, mapJobData);
};

export const getJobById = async (jobId: string) => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/jobs//${customer}/${jobId}`);
  return handleApiResponse(response, mapJobData)[0];
};

export const createJob = async (jobData: object) => {
  let customer = auth.currentUser?.email || "";
  return await apiService.post(`/jobs/${customer}`, jobData);
};

export const updateJob = async (jobId: string, jobData: object) => {
  let customer = auth.currentUser?.email || "";
  return await apiService.put(`/jobs/${customer}/${jobId}`, jobData);
};

export const deleteJob = async (jobId: string) => {
  let customer = auth.currentUser?.email || "";
  return await apiService.delete(`/jobs/${customer}/${jobId}`);
};

export const getImage = async (fileName: string, type: string) => {
  let customer = auth.currentUser?.email || "";
  const response = await apiService.get(`/images/${fileName}/${type}`);
  return response.data.url;
};

export default apiService;
