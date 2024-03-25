import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CustomDrawer } from '../../components/Home/Drawer';
import { CustomAppBar } from '../../components/Home/AppBar';
import { useHome } from '../../hooks/Home';

export const HomePage = () => {
  const { open, toggleDrawer } = useHome();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar open={open} toggleDrawer={toggleDrawer} />
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};
