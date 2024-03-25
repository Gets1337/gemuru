import React from 'react';
import { HomePageLayout } from '../../blocks/Home';
import { useHomePageLogic } from '../../hooks/Home';

export const HomePage = () => {
  const { open, toggleDrawer, handleLogout } = useHomePageLogic();

  // Todo В чем логика вынесения целой страницы в отдельный компонент?
  // Это бесполезно. У тебя получается компонент страницы нужен просто чтобы вывести другой компонент. Странно.
  // Если это сделанно для разделения логики и верстки, та она уже разделена вынесением логики в пользовательский хук
  return (
    <HomePageLayout
      open={open}
      toggleDrawer={toggleDrawer}
      handleLogout={handleLogout}
    />
  );
};
