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
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  email: string;
  licenseExpiry: string;
  status: string;
  demeritExpiry: string;
  fatigueType: string;
  BFMDate: string;
  BFMStart: string;
  BFMEnd: string;
  medicalExpiry: string;
  policeExpiry: string;
  WAFatigueExpiry: string;
  workRightExpiry: string;
  workRightStatus: string;
  inductionDate: string;
  comments: string;
}

export interface Truck {
  id: number;
  registration: string;
  vin: string;
  make: string;
  fleetNumber: string;
  regoState: string;
  status: string;
  regoExp: string;
  lastService: string;
  lastServiceDate: string;
  nextService: string;
  nextServiceDate: string;
  buildYear: string;
}

export interface Trailer {
  id: number;
  registration: string;
  vin: string;
  make: string;
  fleetNumber: string;
  regoState: string;
  status: string;
  regoExp: string;
  lastService: string;
  lastServiceDate: string;
  nextService: string;
  nextServiceDate: string;
  buildYear: string;
}

export interface Vehicle {
  id: number;
  registration: string;
  vin: string;
  make: string;
  fleetNumber: string;
  regoState: string;
  status: string;
  regoExp: string;
  lastService: string;
  lastServiceDate: string;
  nextService: string;
  nextServiceDate: string;
  buildYear: string;
}

export interface Job {
  jobId: string;
  company: string;
  manifest: string;
  pickupCity: string;
  dropOffCity: string;
  pickupDate: string;
  deliveryDate: string;
  deliveryType: string;
  employee: string;
  truck: string;
  trailer1?: string;
  trailer2?: string;
  trailer3?: string;
  trailer4?: string;
  comments: string;
  status: string;
  preTrip: boolean;
  safeJourneyPlan: boolean;
  pods: boolean;
  customerRate: number;
  customerGst: number;
  customerAmount: number;
  driverRate: number;
  driverGst: number;
  driverAmount: number;
}
