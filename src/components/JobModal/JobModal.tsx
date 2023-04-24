import React, { useState, useEffect } from "react";
import { Company, Employee, Truck, Trailer, Job } from "../../types";
import {
  getCompanies,
  getEmployees,
  getTrucks,
  getTrailers,
} from "../../services/apiService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  FormHelperText,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";
import Autocomplete from "@mui/lab/Autocomplete";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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

interface JobModalProps {
  show: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (updatedJob: Job) => void;
}

const JobModal: React.FC<JobModalProps> = ({
  show,
  onClose,
  job,
  onSubmit,
}) => {
  const [preTrip, setPreTrip] = useState(job?.preTrip || false);
  const [safeJourneyPlan, setSafeJourneyPlan] = useState(
    job?.safeJourneyPlan || false
  );
  const [pods, setPods] = useState(job?.pods || false);
  const [customerRate, setCustomerRate] = useState(job?.customerRate || 0);
  const [customerGst, setCustomerGst] = useState(job?.customerGst || 0);
  const [customerAmount, setCustomerAmount] = useState(
    job?.customerAmount || 0
  );
  const [driverRate, setDriverRate] = useState(job?.driverRate || 0);
  const [driverIncludingGST, setDriverIncludingGST] = useState(false);
  const [driverGst, setDriverGst] = useState(job?.customerGst || 0);
  const [driverAmount, setDriverAmount] = useState(job?.customerAmount || 0);
  const [calculatedDriverRate, setCalculatedDriverRate] = useState(0);

  const [customerIncludingGST, setCustomerIncludingGST] = useState(false);
  const [calculatedCustomerRate, setCalculatedCustomerRate] = useState(0);

  const [company, setCompany] = useState(job?.company || "");
  const [pickupCity, setPickupCity] = useState(job?.pickupCity || "");
  const [dropOffCity, setDropOffCity] = useState(job?.dropOffCity || "");
  const [pickupDate, setPickupDate] = useState(job?.pickupDate || "");
  const [deliveryDate, setDeliveryDate] = useState(job?.deliveryDate || "");
  const [deliveryType, setDeliveryType] = useState(job?.deliveryType || "");
  const [employee, setEmployee] = useState(job?.employee || "");
  const [truck, setTruck] = useState(job?.truck || "");
  const [trailer1, setTrailer1] = useState(job?.trailer1 || "");
  const [trailer2, setTrailer2] = useState(job?.trailer2 || "");
  const [trailer3, setTrailer3] = useState(job?.trailer3 || "");
  const [trailer4, setTrailer4] = useState(job?.trailer4 || "");
  const [comments, setComments] = useState(job?.comments || "");
  const [manifest, setManifest] = useState(job?.manifest || "");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (calculatedCustomerRate === 0 || calculatedDriverRate === 0) {
      alert("Please enter pay amounts to submit");
    }

    if (job) {
      const updatedJob = {
        ...job,
        company: company,
        manifest: manifest,
        pickupCity: pickupCity,
        dropOffCity: dropOffCity,
        pickupDate: pickupDate,
        deliveryDate: deliveryDate,
        deliveryType: deliveryType,
        employee: employee,
        truck: truck,
        trailer1: trailer1,
        trailer2: trailer2,
        trailer3: trailer3,
        trailer4: trailer4,
        comments: comments,
        status: "unpaid",
        preTrip: preTrip,
        safeJourneyPlan: safeJourneyPlan,
        pods: pods,
        customerRate: calculatedCustomerRate,
        customerGst: customerGst,
        customerAmount: customerAmount,
        driverRate: calculatedDriverRate,
        driverGst: driverGst,
        driverAmount: driverAmount,
      };
      onSubmit(updatedJob);
    }
  };

  const handleCustomerRateChange = (value: number) => {
    setCustomerRate(value);
    if (customerIncludingGST) {
      const gst = value * (1 / 11);
      setCustomerGst(gst);
      setCustomerAmount(value);
      setCalculatedCustomerRate(value - gst);
    } else {
      const gst = value * 0.1;
      setCustomerGst(gst);
      setCustomerAmount(value + gst);
      setCalculatedCustomerRate(value);
    }
  };

  const handleCustomerIncludingGSTChange = (checked: boolean) => {
    setCustomerIncludingGST(checked);
    console.log(calculatedCustomerRate, customerGst, customerAmount);
    if (checked) {
      const gst = customerRate * (1 / 11);
      setCustomerGst(gst);
      setCustomerAmount(customerRate);
      setCalculatedCustomerRate(customerRate - gst);
    } else {
      const gst = customerRate * 0.1;
      setCustomerGst(gst);
      setCustomerAmount(customerRate + gst);
      setCalculatedCustomerRate(customerRate);
    }
  };

  const handleDriverRateChange = (value: number) => {
    setDriverRate(value);
    if (driverIncludingGST) {
      const gst = value * (1 / 11);
      setDriverGst(gst);
      setDriverAmount(value);
      setCalculatedDriverRate(value - gst);
    } else {
      const gst = value * 0.1;
      setDriverGst(gst);
      setDriverAmount(value + gst);
      setCalculatedDriverRate(value);
    }
  };

  const handleDriverIncludingGSTChange = (checked: boolean) => {
    setDriverIncludingGST(checked);
    console.log(calculatedDriverRate, driverGst, driverAmount);
    if (checked) {
      const gst = driverRate * (1 / 11);
      setDriverGst(gst);
      setDriverAmount(driverRate);
      setCalculatedDriverRate(driverRate - gst);
    } else {
      const gst = driverRate * 0.1;
      setDriverGst(gst);
      setDriverAmount(driverRate + gst);
      setCalculatedDriverRate(driverRate);
    }
  };

  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <StyledFormControl fullWidth>
      <Dialog open={show} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>Edit Job</DialogTitle>
        <div style={{ padding: 10 }}></div>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <Autocomplete
                  value={company}
                  onChange={(event, newValue) => {
                    setCompany(newValue!);
                  }}
                  options={companies.map((company) => company.name)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => (
                    <MenuItem {...props} key={option} value={option}>
                      {option}
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Company" variant="outlined" />
                  )}
                />
                <FormHelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Manifest"
                  variant="outlined"
                  value={manifest}
                  onChange={(e) => setManifest(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={employee}
                  onChange={(event, newValue) => {
                    setEmployee(newValue!);
                  }}
                  options={employees.map(
                    (employee) => `${employee.firstName} ${employee.lastName}`
                  )}
                  getOptionLabel={(option) => `${option}`}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {`${option}`}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={truck}
                  onChange={(event, newValue) => {
                    setTruck(newValue!);
                  }}
                  options={trucks.map((truck) => truck.registration)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Truck" variant="outlined" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={trailer1}
                  onChange={(event, newValue) => {
                    setTrailer1(newValue!);
                  }}
                  options={trailers.map((trailer) => trailer.registration)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Trailer1"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={trailer2}
                  onChange={(event, newValue) => {
                    setTrailer2(newValue!);
                  }}
                  options={trailers.map((trailer) => trailer.registration)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Trailer2"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={trailer3}
                  onChange={(event, newValue) => {
                    setTrailer3(newValue!);
                  }}
                  options={trailers.map((trailer) => trailer.registration)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Trailer3"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={trailer4}
                  onChange={(event, newValue) => {
                    setTrailer4(newValue!);
                  }}
                  options={trailers.map((trailer) => trailer.registration)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    return (
                      <MenuItem {...props} key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Trailer4"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preTrip}
                        onChange={(e) => setPreTrip(e.target.checked)}
                      />
                    }
                    label="Pre Trip"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={safeJourneyPlan}
                        onChange={(e) => setSafeJourneyPlan(e.target.checked)}
                      />
                    }
                    label="Safe Journey Plan"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pods}
                        onChange={(e) => setPods(e.target.checked)}
                      />
                    }
                    label="PODs"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Rate"
                  type="number"
                  value={customerRate}
                  onChange={(e) =>
                    handleCustomerRateChange(Number(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customerIncludingGST}
                      onChange={(e) =>
                        handleCustomerIncludingGSTChange(e.target.checked)
                      }
                    />
                  }
                  label="Including GST"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Chip
                  label={`Rate: $${
                    Math.round(calculatedCustomerRate * 100) / 100
                  }`}
                />
                <Chip label={`GST: $${Math.round(customerGst * 100) / 100}`} />
                <Chip
                  label={`Total: $${Math.round(customerAmount * 100) / 100}`}
                />
              </Grid>
              <div style={{ padding: 10 }}></div>
              <Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Driver Pay"
                    type="number"
                    value={driverRate}
                    onChange={(e) =>
                      handleDriverRateChange(Number(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={driverIncludingGST}
                        onChange={(e) =>
                          handleDriverIncludingGSTChange(e.target.checked)
                        }
                      />
                    }
                    label="Including GST"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Chip
                    label={`Rate: $${
                      Math.round(calculatedDriverRate * 100) / 100
                    }`}
                  />
                  <Chip label={`GST: $${Math.round(driverGst * 100) / 100}`} />
                  <Chip
                    label={`Total: $${Math.round(driverAmount * 100) / 100}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </StyledFormControl>
  );
};

export default JobModal;
