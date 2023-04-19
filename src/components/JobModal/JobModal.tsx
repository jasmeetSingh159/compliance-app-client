import React, { useState } from "react";
import { Job } from "../../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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
  const [price, setPrice] = useState(job?.price || 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (job) {
      const updatedJob = {
        ...job,
        company,
        pickupCity,
        dropOffCity,
        pickupDate,
        deliveryDate,
        deliveryType,
        employee,
        truck,
        trailer1,
        trailer2,
        trailer3,
        trailer4,
        price: 0,
        status: "unpaid",
        preTrip,
        safeJourneyPlan,
        pods,
        customerRate: calculatedCustomerRate,
        customerGst,
        customerAmount,
        driverRate: calculatedDriverRate,
        driverGst,
        driverAmount,
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

  return (
    <StyledFormControl fullWidth>
      <Dialog open={show} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>Edit Job</DialogTitle>
        <div style={{ padding: 10 }}></div>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pickup City"
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Drop-off City"
                value={dropOffCity}
                onChange={(e) => setDropOffCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pickup Date"
                type="date"
                value={pickupDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Delivery Date"
                type="date"
                value={deliveryDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Delivery Type"
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Truck"
                value={truck}
                onChange={(e) => setTruck(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Trailer 1"
                value={trailer1}
                onChange={(e) => setTrailer1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Trailer 2"
                value={trailer2}
                onChange={(e) => setTrailer2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Trailer 3"
                value={trailer3}
                onChange={(e) => setTrailer3(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Trailer 4"
                value={trailer4}
                onChange={(e) => setTrailer4(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />

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
