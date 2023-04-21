import React, { useEffect, useState } from "react";
import { Employee } from "../../types";
import { getImage } from "../../services/apiService";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";

interface DriverDetailsProps {
  driver: Employee;
  show: boolean;
  onClose: () => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  driver,
  show,
  onClose,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDriverImage() {
      const fileId = await getImage(driver.employeeNumber, "profile");
      console.log(fileId);
      if (fileId) {
        setImageUrl(`${fileId}`);
      }
    }

    fetchDriverImage();
  }, [driver.id]);

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  }));
  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <StyledFormControl fullWidth>
      <Dialog open={show} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          {driver.firstName} {driver.middleName} {driver.lastName}
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 4, mb: 2 }}>
            <Grid container spacing={2}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={`Driver ${driver.firstName} ${driver.lastName}`}
                  width="50px"
                  height="50px"
                />
              )}

              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {driver.firstName} {driver.middleName} {driver.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Employee Number:</strong> {driver.employeeNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>License Number:</strong> {driver.licenseNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>License State:</strong> {driver.licenseState}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>License Type:</strong> {driver.licenseType}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Mobile:</strong> {driver.mobileNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Date of Birth:</strong> {driver.dateOfBirth}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Street:</strong> {driver.street}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Suburb:</strong> {driver.suburb}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>State:</strong> {driver.state}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Postcode:</strong> {driver.postcode}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {driver.email}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.licenseExpiry
                    ? parseDate(driver.licenseExpiry!) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.licenseExpiry!) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>License Expiry:</strong> {driver.licenseExpiry}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Status:</strong> {driver.status}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.demeritExpiry
                    ? parseDate(driver.demeritExpiry) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.demeritExpiry) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Demerit Expiry:</strong> {driver.demeritExpiry}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Fatigue Type:</strong> {driver.fatigueType}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>BFM Date:</strong> {driver.BFMDate}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>BFM Start:</strong> {driver.BFMStart}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>BFM End:</strong> {driver.BFMEnd}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.demeritExpiry
                    ? parseDate(driver.medicalExpiry) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.medicalExpiry) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Medical Expiry:</strong> {driver.medicalExpiry}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.policeExpiry
                    ? parseDate(driver.policeExpiry) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.policeExpiry) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Police Expiry:</strong> {driver.policeExpiry}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.WAFatigueExpiry
                    ? parseDate(driver.WAFatigueExpiry) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.WAFatigueExpiry) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>WA Fatigue Expiry:</strong> {driver.WAFatigueExpiry}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={
                  driver.workRightExpiry
                    ? parseDate(driver.workRightExpiry) < new Date()
                      ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                      : parseDate(driver.workRightExpiry) <
                        new Date(new Date().setDate(new Date().getDate() + 14))
                      ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                      : {}
                    : {}
                }
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Work Right Expiry:</strong> {driver.workRightExpiry}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Work Right Status:</strong> {driver.workRightStatus}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Induction Date:</strong> {driver.inductionDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  <strong>Comments:</strong> {driver.comments}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </StyledFormControl>
  );
};

export default DriverDetails;
