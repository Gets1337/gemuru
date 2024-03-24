import React from 'react';
import { HomePageLayout } from '../../blocks/Home';
import { useHomePageLogic } from '../../hooks/Home';

export const HomePage = () => {
  const { open, toggleDrawer, handleLogout } = useHomePageLogic();

  return (
    <HomePageLayout
      open={open}
      toggleDrawer={toggleDrawer}
      handleLogout={handleLogout}
    />
  );
};
