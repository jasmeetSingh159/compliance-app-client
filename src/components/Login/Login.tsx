import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { auth } from "../../firebase";


interface LoginProps {
  onSuccessfulLogin: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onSuccessfulLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
        onSuccessfulLogin()
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;