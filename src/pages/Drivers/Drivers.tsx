import React, { useEffect, useState } from "react";
import { Employee, Job } from "../../types";
import { getEmployees, updateJob } from "../../services/apiService";
import { Box, rgbToHex, Typography } from "@mui/material";
import DriverCard from "../../components/DriverCard/DriverCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import DriverDetails from "../../components/DriverDetails/DriverDetails";

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filteredDrivers = drivers.filter((driver) => {
    const name = `${driver.firstName} ${driver.middleName} ${driver.lastName}`;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Drivers
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

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
            {filteredDrivers.map((driver: Employee) => (
              <>
                <TableRow key={driver.id}>
                  <TableCell>
                    {driver.firstName} {driver.middleName} {driver.lastName}
                  </TableCell>
                  <TableCell>
                    {driver.mobileNumber ? driver.mobileNumber : driver.email}
                  </TableCell>
                  <TableCell
                    style={
                      parseDate(driver.licenseExpiry) < new Date()
                        ? { backgroundColor: `rgba(255, 0, 0,0.5)` }
                        : parseDate(driver.licenseExpiry) <
                          new Date(
                            new Date().setDate(new Date().getDate() + 14)
                          )
                        ? { backgroundColor: `rgba(255, 165, 0,0.5)` }
                        : {}
                    }
                  >
                    {driver.licenseNumber}
                  </TableCell>
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
