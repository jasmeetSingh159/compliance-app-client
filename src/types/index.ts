export interface Company {
  id: number;
  name: string;
  abn: string;
  email: string;
  number: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  invoicename: string;
  comments: string;
}

export interface Employee {
  id: number;
  employeeNumber: string;
  licenseNumber: string;
  licenseState: string;
  licenseType: string;
  mobileNumber: string;
  status: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  email: string;
}

export interface Truck {
  id: number;
  model: string;
  registration: string;
  vin: string;
  tare: string;
  grossVehicleMass: string;
  make: string;
}

export interface Trailer {
  id: number;
  make: string;
  model: string;
  vin: string;
  tare: string;
  grossVehicleMass: string;
}

export interface Job {
  jobId: number;
  company: string;
  pickupCity: string;
  dropOffCity: string;
  pickupDate: string;
  deliveryDate: string;
  deliveryType: string;
  employee: string;
  truck: string;
  trailer1: string;
  trailer2: string;
  trailer3: string;
  trailer4: string;
  price: number;
  status: string;
  preTrip: boolean;
  safeJourneyPlan: boolean;
  pods: boolean;
  customerRate: number;
  customerGst: number;
  customerAmount: number;
  driverPay: number;
}