import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../../firebase';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;