// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatedJobs from "./pages/CreatedJobs/CreatedJobs";
import UnpaidJobs from "./pages/UnpaidJobs/UnpaidJobs";
import ClosedJobs from "./pages/ClosedJobs/ClosedJobs";
import Sidebar from "./components/Sidebar/Sidebar";
import NewJobModal from "./components/NewJobModal/NewJobModal";
import InvoicePage from "./pages/InvoicePage/InvoicePage";

import {
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App: React.FC = () => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const toggleJobModal = () => {
    setIsJobModalOpen(!isJobModalOpen);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, overflowY: "auto", marginLeft: "240px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                onClick={toggleJobModal}
                variant="contained"
                color="primary"
              >
                Add New Job
              </Button>
              {isJobModalOpen && (
                <NewJobModal
                  show={isJobModalOpen}
                  handleClose={toggleJobModal}
                />
              )}
            </Box>
            <Routes>
              <Route path="/created-jobs" element={<CreatedJobs />} />
              <Route path="/unpaid-jobs" element={<UnpaidJobs />} />
              <Route path="/closed-jobs" element={<ClosedJobs />} />
              <Route path="/invoice/:jobId" element={<InvoicePage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
