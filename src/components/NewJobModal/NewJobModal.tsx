import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Company, Employee, Truck, Trailer } from "../../types";
import {
  getCompanies,
  getEmployees,
  getTrucks,
  getTrailers,
  createJob,
} from "../../services/apiService";
import Autocomplete from "@mui/lab/Autocomplete";

interface NewJobModalProps {
  show: boolean;
  handleClose: () => void;
}

const generateJobId = (): string => {
  return `JOB-${Math.random().toString(36).substr(2, 9)}`;
};

const cityOptions = [
  "BNE",
  "MEL",
  "SYD",
  "ADE",
  "GEX",
  "NTL",
  "PER",
  "YCDS",
  "CANB",
  "OTHER",
];

const deliveryTypeOptions = ["Semi", "BDouble", "ATriple", "Road Train"];

const NewJobModal: React.FC<NewJobModalProps> = ({ show, handleClose }) => {
  const [jobId] = useState(generateJobId());
  const [pickupCity, setPickupCity] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [company, setCompany] = useState<Company | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [truck, setTruck] = useState<Truck | null>(null);
  const [trailer1, setTrailer1] = useState<Trailer | null>(null);
  const [trailer2, setTrailer2] = useState<Trailer | null>(null);
  const [trailer3, setTrailer3] = useState<Trailer | null>(null);
  const [trailer4, setTrailer4] = useState<Trailer | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [pickupDate, setPickupDate] = useState(String);
  const [deliveryDate, setDeliveryDate] = useState(String);
  const [price, setPrice] = useState(Number);

  const fetchCompanies = async () => {
    const fetchedCompanies = await getCompanies();
    setCompanies(fetchedCompanies);
  };

  const fetchEmployees = async () => {
    const fetchedEmployees = await getEmployees();
    const filteredEmployees = fetchedEmployees.filter(
      (driver: Employee) => driver.status === "Current"
    );
    setEmployees(filteredEmployees);
  };

  const fetchTrucks = async () => {
    const fetchedTrucks = await getTrucks();
    const filteredTrucks = fetchedTrucks.filter(
      (truck: Truck) => truck.status === "active"
    );

    setTrucks(filteredTrucks);
  };

  const fetchTrailers = async () => {
    const fetchedTrailers = await getTrailers();
    const filteredTrailers = fetchedTrailers.filter(
      (trailer: Trailer) => trailer.status === "active"
    );
    setTrailers(filteredTrailers);
  };

  useEffect(() => {
    fetchCompanies();
    fetchEmployees();
    fetchTrucks();
    fetchTrailers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t1 = trailer1 ? trailer1 : "";
    const t2 = trailer2 ? trailer2 : "";
    const t3 = trailer3 ? trailer3 : "";
    const t4 = trailer4 ? trailer4 : "";

    if (
      !company ||
      !pickupCity ||
      !dropOffCity ||
      !pickupDate ||
      !deliveryDate ||
      !employee ||
      !truck
    ) {
      alert("Please fill in all fields");
      return;
    }

    const jobData = {
      jobId,
      company,
      pickupCity,
      dropOffCity,
      pickupDate,
      deliveryDate,
      deliveryType,
      employee,
      truck,
      trailer1: t1,
      trailer2: t2,
      trailer3: t3,
      trailer4: t4,
      price,
      status: "created",
      preTrip: "",
      safeJourneyPlan: "",
      pods: "",
      customerRate: "",
      customerGst: "",
      customerAmount: "",
      driverPay: "",
    };
    handleClose();
    console.log(jobData);
    await createJob(jobData);
    console.log("job created");
  };

  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="xl">
      <DialogTitle>
        <Typography variant="h6">Add New Job</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <TextField
              fullWidth
              margin="normal"
              label="Job ID"
              value={jobId}
              InputProps={{ readOnly: true }}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="company-select">Company</InputLabel>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value as Company)}
                label="Company"
                inputProps={{
                  name: "company",
                  id: "company-select",
                }}
              >
                {companies.map((comp) => (
                  <MenuItem key={comp.name} value={comp.name}>
                    {comp.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="pickup">Pickup City</InputLabel>
              <Select
                label="Pickup City"
                inputProps={{
                  name: "pickup",
                  id: "pickup",
                }}
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
              >
                {cityOptions.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="delivery">Delivery City</InputLabel>
              <Select
                label="Delivery City"
                inputProps={{
                  name: "delivery",
                  id: "delivery",
                }}
                value={dropOffCity}
                onChange={(e) => setDropOffCity(e.target.value)}
              >
                {cityOptions.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="pickupDate"
              label="Pickup Date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <TextField
              id="deliveryDate"
              label="Delivery Date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Delivery Type</InputLabel>
              <Select
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
              >
                {deliveryTypeOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="employee">Employee</InputLabel>
              <Select
                label="employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value as Employee)}
                inputProps={{
                  name: "employee",
                  id: "employee",
                }}
              >
                {employees?.map((emp) => (
                  <MenuItem
                    style={
                      (emp.licenseExpiry &&
                        parseDate(emp.licenseExpiry) < new Date()) ||
                      (emp.medicalExpiry &&
                        parseDate(emp.medicalExpiry) < new Date()) ||
                      (emp.policeExpiry &&
                        parseDate(emp.policeExpiry) < new Date()) ||
                      (emp.WAFatigueExpiry &&
                        parseDate(emp.WAFatigueExpiry) < new Date()) ||
                      (emp.workRightStatus &&
                        parseDate(emp.workRightStatus) < new Date())
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : (emp.licenseExpiry &&
                            parseDate(emp.licenseExpiry) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (emp.medicalExpiry &&
                            parseDate(emp.medicalExpiry) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (emp.policeExpiry &&
                            parseDate(emp.policeExpiry) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (emp.WAFatigueExpiry &&
                            parseDate(emp.WAFatigueExpiry) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (emp.workRightStatus &&
                            parseDate(emp.workRightStatus) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              ))
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                    key={emp.employeeNumber}
                    value={emp.employeeNumber}
                  >
                    {`${emp.firstName} ${emp.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="truck">Truck</InputLabel>
              <Select
                value={truck}
                onChange={(e) => setTruck(e.target.value as Truck)}
                inputProps={{
                  name: "Truck",
                  id: "truck",
                }}
              >
                {trucks.map((t) => (
                  <MenuItem
                    style={
                      (t.nextServiceDate &&
                        parseDate(t.nextServiceDate) < new Date()) ||
                      (t.regoExp && parseDate(t.regoExp) < new Date())
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : (t.nextServiceDate &&
                            parseDate(t.nextServiceDate) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (t.regoExp &&
                            parseDate(t.regoExp) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              ))
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                    key={t.registration}
                    value={t.registration}
                  >
                    {t.registration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="trailer1">Trailer1</InputLabel>
              <Select
                value={trailer1}
                onChange={(e) => setTrailer1(e.target.value as Trailer)}
                inputProps={{
                  name: "trailer1",
                  id: "trailer1",
                }}
              >
                {trailers.map((trl) => (
                  <MenuItem
                    key={trl.registration}
                    value={trl.registration}
                    style={
                      (trl.nextServiceDate &&
                        parseDate(trl.nextServiceDate) < new Date()) ||
                      (trl.regoExp && parseDate(trl.regoExp) < new Date())
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : (trl.nextServiceDate &&
                            parseDate(trl.nextServiceDate) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (trl.regoExp &&
                            parseDate(trl.regoExp) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              ))
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                  >
                    {trl.registration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="trailer2">Trailer2</InputLabel>
              <Select
                inputProps={{
                  name: "trailer2",
                  id: "trailer2",
                }}
                value={trailer2}
                onChange={(e) => setTrailer2(e.target.value as Trailer)}
              >
                {trailers.map((trl) => (
                  <MenuItem
                    key={trl.registration}
                    value={trl.registration}
                    style={
                      (trl.nextServiceDate &&
                        parseDate(trl.nextServiceDate) < new Date()) ||
                      (trl.regoExp && parseDate(trl.regoExp) < new Date())
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : (trl.nextServiceDate &&
                            parseDate(trl.nextServiceDate) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (trl.regoExp &&
                            parseDate(trl.regoExp) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              ))
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                  >
                    {trl.registration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="trailer3">Trailer3</InputLabel>
              <Select
                inputProps={{
                  name: "trailer3",
                  id: "trailer3",
                }}
                value={trailer3}
                onChange={(e) => setTrailer3(e.target.value as Trailer)}
              >
                {trailers.map((trl) => (
                  <MenuItem
                    key={trl.registration}
                    value={trl.registration}
                    style={
                      (trl.nextServiceDate &&
                        parseDate(trl.nextServiceDate) < new Date()) ||
                      (trl.regoExp && parseDate(trl.regoExp) < new Date())
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : (trl.nextServiceDate &&
                            parseDate(trl.nextServiceDate) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              )) ||
                          (trl.regoExp &&
                            parseDate(trl.regoExp) <
                              new Date(
                                new Date().setDate(new Date().getDate() + 14)
                              ))
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                  >
                    {trl.registration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="trailer4">Trailer4</InputLabel>
              <Autocomplete
                value={trailer4}
                onChange={(event, newValue) => {
                  setTrailer4(newValue as Trailer);
                }}
                options={trailers}
                getOptionLabel={(option) => option.registration}
                renderOption={(props, option) => {
                  const isRed =
                    (option.nextServiceDate &&
                      parseDate(option.nextServiceDate) < new Date()) ||
                    (option.regoExp && parseDate(option.regoExp) < new Date());
                  const isOrange =
                    (option.nextServiceDate &&
                      parseDate(option.nextServiceDate) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        )) ||
                    (option.regoExp &&
                      parseDate(option.regoExp) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        ));

                  const backgroundColor = isRed
                    ? "rgba(255, 0, 0, 0.5)"
                    : isOrange
                    ? "rgba(255, 165, 0, 0.5)"
                    : "";

                  return (
                    <MenuItem
                      {...props}
                      key={option.registration}
                      value={option.registration}
                      style={{ backgroundColor }}
                    >
                      {option.registration}
                    </MenuItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Trailer4" variant="outlined" />
                )}
              />
            </FormControl>
            <TextField
              fullWidth
              value={price}
              margin="normal"
              label="Price"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Box>
        </DialogContent>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

export default NewJobModal;
