import React from 'react';
import { SignOnPageLayout } from '../../blocks/SignOn';

// Todo В чем логика вынесения целой страницы в отдельный компонент?
// Это бесполезно. У тебя получается компонент страницы нужен просто чтобы вывести другой компонент. Странно.
export const SignOnPage = () => {
  return <SignOnPageLayout />;
};
