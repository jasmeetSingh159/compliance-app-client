import React, { useEffect, useState } from "react";
import { Employee, Job } from "../../types";
import { getEmployees, updateJob } from "../../services/apiService";
import { Box, Typography } from "@mui/material";
import DriverCard from "../../components/DriverCard/DriverCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import DriverDetails from "../../components/DriverDetails/DriverDetails";

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Employee | null>(null);

  // Function to handle opening the JobModal
  const handleOpenJobModal = (driver: Employee) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  // Function to handle closing the JobModal
  const handleCloseJobModal = () => {
    setSelectedDriver(null);
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchDriver() {
      const employees = await getEmployees();
      console.log(employees);
      setDrivers(employees);
    }

    fetchDriver();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Drivers
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>License</TableCell>
              <TableCell>Work Options</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver: Employee) => (
              <>
                <TableRow key={driver.id}>
                  <TableCell>
                    {driver.firstName} {driver.middleName} {driver.lastName}
                  </TableCell>
                  <TableCell>
                    {driver.mobileNumber ? driver.mobileNumber : driver.email}
                  </TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.fatigueType}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenJobModal(driver)}>
                      &gt;&gt;
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {" "}
                  {showModal && selectedDriver?.id === driver.id ? (
                    <DriverDetails
                      show={showModal}
                      onClose={handleCloseJobModal}
                      driver={selectedDriver!}
                    />
                  ) : null}
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Drivers;
