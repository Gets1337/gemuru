import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <IconButton color="inherit" onClick={handleLogout}>
      <Typography
        variant="body1"
        color="inherit"
        sx={{ fontFamily: 'Roboto', fontSize: '1rem' }}
      >
        Выход
      </Typography>
    </IconButton>
  );
};
