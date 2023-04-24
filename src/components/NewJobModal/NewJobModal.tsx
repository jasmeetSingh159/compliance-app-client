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
  const [comments, setComments] = useState(String);
  const [manifest, setManifest] = useState("");

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
    const t1 = trailer1 ? trailer1.registration : "";
    const t2 = trailer2 ? trailer2.registration : "";
    const t3 = trailer3 ? trailer3.registration : "";
    const t4 = trailer4 ? trailer4.registration : "";

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
      company: company.name,
      manifest: manifest,
      pickupCity: pickupCity,
      dropOffCity: dropOffCity,
      pickupDate: pickupDate,
      deliveryDate: deliveryDate,
      deliveryType: deliveryType,
      employee: employee.employeeNumber,
      truck: truck.registration,
      trailer1: t1,
      trailer2: t2,
      trailer3: t3,
      trailer4: t4,
      comments,
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
              <Autocomplete
                value={company}
                onChange={(event, newValue) => {
                  setCompany(newValue as Company);
                }}
                options={companies}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Company" variant="outlined" />
                )}
              />
              <FormHelperText />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Manifest"
                variant="outlined"
                value={manifest}
                onChange={(e) => setManifest(e.target.value)}
              />
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
              <Autocomplete
                value={employee}
                onChange={(event, newValue) => {
                  setEmployee(newValue as Employee);
                }}
                options={employees}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                renderOption={(props, option) => {
                  const isRed =
                    (option.licenseExpiry &&
                      parseDate(option.licenseExpiry) < new Date()) ||
                    (option.medicalExpiry &&
                      parseDate(option.medicalExpiry) < new Date()) ||
                    (option.policeExpiry &&
                      parseDate(option.policeExpiry) < new Date()) ||
                    (option.WAFatigueExpiry &&
                      parseDate(option.WAFatigueExpiry) < new Date()) ||
                    (option.workRightStatus &&
                      parseDate(option.workRightStatus) < new Date());

                  const isOrange =
                    (option.licenseExpiry &&
                      parseDate(option.licenseExpiry) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        )) ||
                    (option.medicalExpiry &&
                      parseDate(option.medicalExpiry) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        )) ||
                    (option.policeExpiry &&
                      parseDate(option.policeExpiry) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        )) ||
                    (option.WAFatigueExpiry &&
                      parseDate(option.WAFatigueExpiry) <
                        new Date(
                          new Date().setDate(new Date().getDate() + 14)
                        )) ||
                    (option.workRightStatus &&
                      parseDate(option.workRightStatus) <
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
                      key={option.employeeNumber}
                      value={option.employeeNumber}
                      style={{ backgroundColor }}
                    >
                      {`${option.firstName} ${option.lastName}`}
                    </MenuItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Employee" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                value={truck}
                onChange={(event, newValue) => {
                  setTruck(newValue as Truck);
                }}
                options={trucks}
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
                  <TextField {...params} label="Truck" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                value={trailer1}
                onChange={(event, newValue) => {
                  setTrailer1(newValue as Trailer);
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
                  <TextField {...params} label="Trailer1" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                value={trailer2}
                onChange={(event, newValue) => {
                  setTrailer2(newValue as Trailer);
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
                  <TextField {...params} label="Trailer2" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                value={trailer3}
                onChange={(event, newValue) => {
                  setTrailer3(newValue as Trailer);
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
                  <TextField {...params} label="Trailer3" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
              <TextField
                label="Comments"
                variant="outlined"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </FormControl>
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
