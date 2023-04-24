// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreatedJobs from "./pages/CreatedJobs/CreatedJobs";
import UnpaidJobs from "./pages/UnpaidJobs/UnpaidJobs";
import ClosedJobs from "./pages/ClosedJobs/ClosedJobs";
import Sidebar from "./components/Sidebar/Sidebar";
import NewJobModal from "./components/NewJobModal/NewJobModal";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";

import {
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
  useMediaQuery,
} from "@mui/material";
import Drivers from "./pages/Drivers/Drivers";
import Vehicles from "./pages/Vehicles/Vehicles";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onSuccessfulLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isAuthenticated ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              overflowY: "auto",
              marginLeft: isMobile ? "0px" : "240px",
              marginTop: isMobile ? "100px" : "20px",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 100px)" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/active" />} />

                <Route path="/active" element={<CreatedJobs />} />
                <Route path="/billed" element={<UnpaidJobs />} />
                <Route path="/closed" element={<ClosedJobs />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/invoice/:jobId" element={<InvoicePage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  ) : (
    <Login onSuccessfulLogin={onSuccessfulLogin} />
  );
};

export default App;
