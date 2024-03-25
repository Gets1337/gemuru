import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';

// Todo Что это вообще такое? Судя по содержимому это даже не компонент. А лежит в папке components
// Либо из него нужно сделать компонент, либо положить в соответствующую папку
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Панель приборов" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Пользователи" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Редактирование" />
    </ListItemButton>
  </React.Fragment>
);
