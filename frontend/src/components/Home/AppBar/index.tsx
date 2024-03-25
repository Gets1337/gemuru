import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

const drawerWidth: number = 240;

type AppBarProps = {
  open?: boolean;
  toggleDrawer: () => void;
  handleLogout: () => void;
};

const AppBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'absolute',
  width: '100%',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const CustomAppBar = ({
  open,
  toggleDrawer,
  handleLogout,
}: AppBarProps) => (
  <AppBar component="header" open={open}>
    <MuiAppBar position="absolute">
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontFamily: 'Roboto', fontSize: '1.6rem' }}
        >
          Gemuru
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <Typography
            variant="body1"
            color="inherit"
            sx={{ fontFamily: 'Roboto', fontSize: '1rem' }}
          >
            Выход
          </Typography>
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  </AppBar>
);

export default CustomAppBar;
