// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatedJobs from "./pages/CreatedJobs/CreatedJobs";
import UnpaidJobs from "./pages/UnpaidJobs/UnpaidJobs";
import Sidebar from "./components/Sidebar/Sidebar";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";

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
            <Routes>
              <Route path="/created-jobs" element={<CreatedJobs />} />
              <Route path="/unpaid-jobs" element={<UnpaidJobs />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
