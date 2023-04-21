import React, { useEffect, useState } from "react";
import { Vehicle } from "../../types";
import { getTrucks, getTrailers } from "../../services/apiService";
import { Box, Typography, TextField } from "@mui/material";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Vehicles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trucks, setTrucks] = useState<Vehicle[]>([]);
  const [trailers, setTrailers] = useState<Vehicle[]>([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    async function fetchTrucks() {
      const truckData = await getTrucks();
      console.log(truckData);
      setTrucks(truckData);
    }

    async function fetchTrailers() {
      const trailerData = await getTrailers();
      console.log(trailerData);
      setTrailers(trailerData);
    }

    fetchTrucks();
    fetchTrailers();
  }, []);

  const filteredTrucks = trucks.filter((truck) => {
    return (
      truck.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.vin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredTrailers = trailers.filter((trailer) => {
    return (
      trailer.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trailer.vin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const VehicleTable = (vehicles: Vehicle[]) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Registration</TableCell>
          <TableCell>VIN</TableCell>
          <TableCell>Next Service</TableCell>
          <TableCell>Next Service Date</TableCell>
          <TableCell>Last Service</TableCell>
          <TableCell>Last Service Date</TableCell>
          <TableCell>Rego Exp</TableCell>
          <TableCell>Build Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vehicles.map((vehicle: Vehicle) => (
          <TableRow
            key={vehicle.id}
            style={
              vehicle.status === "active"
                ? {}
                : {
                    textDecoration: "line-through",
                    color: "rgba(0,0,0,1)",
                    textDecorationThickness: "1px",
                  }
            }
          >
            <VehicleCard vehicle={vehicle} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vehicles
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
          />
        }
        label="Show All"
        sx={{ marginBottom: 3 }}
      />

      <Accordion>
        <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
          <Typography>Trucks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            {VehicleTable(
              showAll
                ? filteredTrucks
                : filteredTrucks.filter((truck) => truck.status === "active")
            )}
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
          <Typography>Trailers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            {VehicleTable(
              showAll
                ? filteredTrailers
                : filteredTrailers.filter(
                    (trailer) => trailer.status === "active"
                  )
            )}
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Vehicles;
